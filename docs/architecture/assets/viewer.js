/* Renders the Markdown templates and the Aurora example inside the website. */
(function () {
  'use strict';

  var BASE = 'blueprints/';

  var DOCS = window.AB_DOCS;

  // File names and ADR IDs mentioned in a document become links to the viewer.
  var LINK_TARGETS = {};
  DOCS.forEach(function (d) {
    var file = d.path.split('/').pop();
    if (file !== 'README.md') {
      LINK_TARGETS[file] = d.path;
    }
  });

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function splitFrontMatter(md) {
    var m = md.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!m) {
      return { meta: null, body: md };
    }
    var meta = [];
    m[1].split('\n').forEach(function (line) {
      var kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
      if (kv) {
        var value = kv[2].replace(/\s+#.*$/, '').replace(/^"(.*)"$/, '$1');
        meta.push([kv[1], value]);
      }
    });
    return { meta: meta, body: md.slice(m[0].length) };
  }

  // Code blocks are set aside so that comments inside them stay literal.
  function preprocess(body) {
    var blocks = [];
    body = body.replace(/```[\s\S]*?```|`[^`\n]+`/g, function (block) {
      blocks.push(block);
      return '\u0000' + (blocks.length - 1) + '\u0000';
    });
    body = body.replace(/<!--\s*adoit-view:\s*([^\s]+)\s*-->(\s*\u0000(\d+)\u0000)?/g, function (all, id, next, i) {
      if (next && /^```mermaid/.test(blocks[Number(i)])) {
        return '\n<div class="ab-view-caption">Stand-in for the repository view <code>' + escapeHtml(id) +
          '</code>. In practice the publishing pipeline embeds the diagram from the repository here.</div>\n' + next;
      }
      return '\n<div class="ab-view">Diagram from the architecture repository (ADOIT view <code>' +
        escapeHtml(id) + '</code>), embedded by the publishing pipeline.</div>\n' + (next || '');
    });
    body = body.replace(/<!--([\s\S]*?)-->/g, function (all, text) {
      return '\n<div class="ab-guidance">' + escapeHtml(text.trim()) + '</div>\n';
    });
    return body.replace(/\u0000(\d+)\u0000/g, function (all, i) {
      return blocks[Number(i)];
    });
  }

  function linkify(root, currentPath) {
    var pattern = new RegExp('(' + Object.keys(LINK_TARGETS).map(function (k) {
      return k.replace(/[.\-]/g, '\\$&');
    }).sort(function (a, b) {
      return b.length - a.length;
    }).join('|') + ')(?![\\w-])', 'g');
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) {
      var n = walker.currentNode;
      if (!n.parentElement.closest('a, pre, .ab-frontmatter') && pattern.test(n.nodeValue)) {
        nodes.push(n);
      }
      pattern.lastIndex = 0;
    }
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      var last = 0;
      node.nodeValue.replace(pattern, function (match, key, offset) {
        frag.appendChild(document.createTextNode(node.nodeValue.slice(last, offset)));
        var target = LINK_TARGETS[key];
        if (target === currentPath) {
          frag.appendChild(document.createTextNode(match));
        } else {
          var a = document.createElement('a');
          a.href = 'viewer.html?doc=' + encodeURIComponent(target);
          a.textContent = match;
          frag.appendChild(a);
        }
        last = offset + match.length;
      });
      frag.appendChild(document.createTextNode(node.nodeValue.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function renderNav(currentPath) {
    var nav = document.getElementById('ab-viewer-nav');
    var html = '';
    var group = null;
    DOCS.forEach(function (d) {
      if (d.group !== group) {
        html += (group ? '</ul>' : '') + '<h5>' + escapeHtml(d.group) + '</h5><ul>';
        group = d.group;
      }
      html += '<li><a href="viewer.html?doc=' + encodeURIComponent(d.path) + '"' +
        (d.path === currentPath ? ' class="active"' : '') + '>' + escapeHtml(d.title) + '</a></li>';
    });
    nav.innerHTML = html + '</ul>';
  }

  // Previous / next within the reading order of DOCS; the example also links back to its guided tour.
  function pager(doc) {
    var i = DOCS.indexOf(doc);
    var nav = document.createElement('div');
    nav.className = 'ab-pager';
    var isTemplate = function (d) {
      return d && d.group === 'Templates';
    };
    [DOCS[i - 1], DOCS[i + 1]].forEach(function (d, k) {
      var a = document.createElement('a');
      if (d && isTemplate(d) === isTemplate(doc)) {
        a.href = 'viewer.html?doc=' + encodeURIComponent(d.path);
        a.textContent = k === 0 ? '← ' + d.title : d.title + ' →';
      } else {
        var page = doc.group === 'Templates' ? 'templates.html' : 'example.html';
        a.href = page;
        a.textContent = k === 0 ? '← Back to the overview' : 'Back to the overview →';
      }
      nav.appendChild(a);
    });
    if (doc.group !== 'Templates') {
      var tour = document.createElement('p');
      tour.innerHTML = '<a href="example.html"><i class="fa fa-map-o"></i> Guided tour of the Aurora example</a>';
      var wrap = document.createDocumentFragment();
      wrap.appendChild(nav);
      wrap.appendChild(tour);
      return wrap;
    }
    return nav;
  }

  // Scrolls to and marks the element that defines the requested ID.
  function highlight(content, id) {
    if (!id || !/^[A-Z0-9-]+$/.test(id)) {
      return;
    }
    var el = window.abFindDefinition(content, id);
    if (el) {
      el.classList.add('ab-hit');
      el.scrollIntoView({ block: 'center' });
    }
  }

  function show(doc) {
    var content = document.getElementById('ab-doc');
    var title = document.getElementById('ab-doc-title');
    var raw = document.getElementById('ab-doc-raw');
    renderNav(doc ? doc.path : null);
    if (!doc) {
      title.textContent = 'Document not found';
      content.innerHTML = '<p>Choose a template or an example document from the list.</p>';
      return;
    }
    title.textContent = doc.title;
    document.title = doc.title + ' | Architecture Blueprints';
    document.querySelectorAll('.header-area .nav a').forEach(function (a) {
      var page = doc.group === 'Templates' ? 'templates.html' : 'example.html';
      a.classList.toggle('active', a.getAttribute('href') === page);
    });
    raw.href = BASE + doc.path;
    raw.style.display = '';

    fetch(BASE + doc.path, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) {
        throw new Error(r.status + ' ' + r.statusText);
      }
      return r.text();
    }).then(function (md) {
      var parts = splitFrontMatter(md.replace(/\r\n/g, '\n'));
      var html = '';
      if (parts.meta) {
        html += '<details class="ab-frontmatter"><summary>Front matter (document metadata)</summary><table>';
        parts.meta.forEach(function (kv) {
          html += '<tr><td>' + escapeHtml(kv[0]) + '</td><td>' + escapeHtml(kv[1]) + '</td></tr>';
        });
        html += '</table></details>';
      }
      html += window.marked.parse(preprocess(parts.body));
      content.innerHTML = window.DOMPurify.sanitize(html);
      content.querySelectorAll('pre code.language-mermaid').forEach(function (code) {
        var div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code.textContent;
        code.parentNode.replaceWith(div);
      });
      var h1 = content.querySelector('h1');
      if (h1) {
        title.textContent = h1.textContent;
        h1.remove();
      }
      linkify(content, doc.path);
      window.abAnnotateTerms(content);
      if (doc.group !== 'Templates') {
        var hint = document.createElement('div');
        hint.className = 'ab-callout ab-tip';
        hint.innerHTML = '<p>Every ID such as SYS-NOVA or IF-04 is a link: it opens the place where the object ' +
          'is defined in a new tab, usually the <a href="viewer.html?doc=example%2F00-adoit-model-extract.md">' +
          'model extract</a>. The <a href="glossary.html#id-prefixes">glossary</a> explains each prefix; ' +
          'underlined terms show an explanation on hover.</p>';
        content.insertBefore(hint, content.firstChild);
      }
      content.appendChild(pager(doc));
      window.abCurrentDoc = doc.path;
      window.abRenderMermaid();
      window.abLinkIds(content, doc.path).then(function () {
        highlight(content, new URLSearchParams(window.location.search).get('id'));
      });
    }).catch(function (err) {
      content.innerHTML = '<p>The document could not be loaded (' + escapeHtml(err.message) +
        '). <a href="' + BASE + doc.path + '">Open the Markdown file directly.</a></p>';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var requested = new URLSearchParams(window.location.search).get('doc') || 'templates/README.md';
    show(DOCS.filter(function (d) {
      return d.path === requested;
    })[0]);
  });
})();
