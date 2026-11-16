/* Makes every ID of the Aurora example (SYS-NOVA, IF-04, ADR-ENT-001, ...) a link to where it is defined. */
(function () {
  'use strict';

  var PREFIXES = 'SG|CAP|DOM|DP|SYS|IF|BO|EP|DPP|STD|REG|PL|WP|SB|ADR|EXC|TD|R|OA|PF|ENT';
  var ID_SOURCE = '(?<![\\w-])(?:' + PREFIXES + ')-[A-Z0-9]+(?:-[A-Z0-9]+)*(?![\\w-])';
  var BASE = 'blueprints/';

  // Documents that define IDs; the model extract comes first because it is the master for model objects.
  function indexedDocs() {
    return window.AB_DOCS.filter(function (d) {
      return d.group !== 'Templates' && !/README\.md$|FINDINGS\.md$/.test(d.path);
    });
  }

  // rank 1: the document itself; 2: table row starting with the ID; 3: other table row; 4: other text.
  function scan(doc, md, index) {
    // Keeps every candidate, best first; ties keep the document order of AB_DOCS.
    function offer(id, rank) {
      var list = index[id] || (index[id] = []);
      if (!list.some(function (c) { return c.path === doc.path && c.rank <= rank; })) {
        list.push({ path: doc.path, rank: rank });
        list.sort(function (a, b) { return a.rank - b.rank; });
      }
    }
    var lines = md.replace(/\r\n/g, '\n').split('\n');
    var i = 0;
    if (lines[0] === '---') {
      var fm = {};
      for (i = 1; i < lines.length && lines[i] !== '---'; i++) {
        var kv = lines[i].match(/^(\w+):\s*"?([^"#]*)"?/);
        if (kv) {
          fm[kv[1]] = kv[2].trim();
        }
      }
      i++;
      if (fm.adr_id) {
        offer(fm.adr_id, 1);
      }
      if (/^(enterprise|domain|dp|system)$/.test(fm.blueprint) && new RegExp('^' + ID_SOURCE + '$').test(fm.adoit_id)) {
        offer(fm.adoit_id, 1);
      }
      var sb = (fm.title || '').match(/SB-\d+/);
      if (fm.blueprint === 'solution' && sb) {
        offer(sb[0], 1);
      }
    }
    var inCode = false;
    for (; i < lines.length; i++) {
      var line = lines[i];
      if (/^```/.test(line)) {
        inCode = !inCode;
        continue;
      }
      if (inCode || /^\s*<!--/.test(line)) {
        continue;
      }
      var cells = /^\s*\|/.test(line) ? line.split('|').slice(1, -1) : null;
      (line.match(new RegExp(ID_SOURCE, 'g')) || []).forEach(function (id) {
        if (cells && new RegExp('^\\s*' + id + '(\\s|$)').test(cells[0])) {
          offer(id, 2);
        } else {
          offer(id, cells ? 3 : 4);
        }
      });
    }
  }

  var indexPromise = null;
  function loadIndex() {
    if (!indexPromise) {
      var docs = indexedDocs();
      indexPromise = Promise.all(docs.map(function (d) {
        return fetch(BASE + d.path, { cache: 'no-cache' }).then(function (r) {
          return r.ok ? r.text() : '';
        });
      })).then(function (texts) {
        var index = {};
        docs.forEach(function (d, k) {
          scan(d, texts[k], index);
        });
        return index;
      });
    }
    return indexPromise;
  }

  // Finds the element in a rendered document that defines the ID, following the same ranking.
  window.abFindDefinition = function (root, id) {
    var re = new RegExp('(^|[^\\w-])' + id + '(?![\\w-])');
    var rows = Array.prototype.slice.call(root.querySelectorAll('tr'));
    var first = rows.filter(function (tr) {
      var cell = tr.querySelector('td');
      return cell && new RegExp('^\\s*' + id + '(\\s|$)').test(cell.textContent);
    })[0];
    if (first) {
      return first;
    }
    var any = rows.concat(Array.prototype.slice.call(root.querySelectorAll('p, li'))).filter(function (el) {
      return !el.closest('.mermaid, .ab-callout') && re.test(el.textContent);
    });
    return any[0] || null;
  };

  // Links IDs in text nodes below root; skips code, existing links and Mermaid sources.
  window.abLinkIds = function (root, currentPath) {
    if (!root || !new RegExp(ID_SOURCE).test(root.textContent)) {
      return Promise.resolve();
    }
    return loadIndex().then(function (index) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) {
        var p = walker.currentNode.parentElement;
        if (!p.closest('a, code, pre, .ab-frontmatter, .mermaid:not([data-processed]), text') &&
          new RegExp(ID_SOURCE).test(walker.currentNode.nodeValue)) {
          nodes.push(walker.currentNode);
        }
      }
      nodes.forEach(function (node) {
        var frag = document.createDocumentFragment();
        var text = node.nodeValue;
        var last = 0;
        text.replace(new RegExp(ID_SOURCE, 'g'), function (id, offset) {
          // A document's own ID points to its next-best definition, e.g. the model extract row.
          var target = (index[id] || []).filter(function (c) {
            return !(c.rank === 1 && c.path === currentPath);
          })[0];
          frag.appendChild(document.createTextNode(text.slice(last, offset)));
          last = offset + id.length;
          if (!target) {
            frag.appendChild(document.createTextNode(id));
            return id;
          }
          var a = document.createElement('a');
          a.className = 'ab-id';
          a.textContent = id;
          a.href = 'viewer.html?doc=' + encodeURIComponent(target.path) + (target.rank > 1 ? '&id=' + id : '');
          a.target = '_blank';
          a.rel = 'noopener';
          a.title = 'Open the definition of ' + id + ' in a new tab';
          a.addEventListener('click', function (e) {
            e.stopPropagation();
          });
          frag.appendChild(a);
          return id;
        });
        frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });
  };
})();
