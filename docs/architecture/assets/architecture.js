/* Shared behaviour of the Architecture Blueprint pages: table of contents and Mermaid. */
(function () {
  'use strict';

  function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // Builds the table of contents from h2/h3 of .ab-content into #ab-toc.
  window.abBuildToc = function () {
    var toc = document.getElementById('ab-toc');
    var content = document.querySelector('.ab-content');
    if (!toc || !content) {
      return;
    }
    var list = document.createElement('ul');
    content.querySelectorAll('h2, h3[data-toc]').forEach(function (h) {
      if (!h.id) {
        h.id = slug(h.textContent);
      }
      var li = document.createElement('li');
      if (h.tagName === 'H3') {
        li.className = 'ab-toc-sub';
      }
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.getAttribute('data-toc') || h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.innerHTML = '<div class="ab-toc-title">On this page</div>';
    toc.appendChild(list);
  };

  window.abRenderMermaid = function () {
    if (!window.mermaid || !document.querySelector('.mermaid')) {
      return;
    }
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'strict'
    });
    document.querySelectorAll('.mermaid:not([data-processed])').forEach(function (el) {
      var legend = buildLegend(el.textContent);
      el.parentNode.insertBefore(legend, el.nextSibling);
    });
    window.mermaid.run({ querySelector: '.mermaid' }).then(function () {
      enableZoom();
      if (window.abLinkIds) {
        document.querySelectorAll('.mermaid svg').forEach(function (svg) {
          window.abLinkIds(svg, window.abCurrentDoc || null);
        });
      }
    });
  };

  // Meaning of the classes and line styles used in the diagrams (ArchiMate layer colours).
  var CLASSES = [
    ['biz', '#ffffb5', '#a89a2b', 'Business: goal, domain, digital product, business object'],
    ['app', '#b5ffff', '#2a7f8f', 'Application: system or component'],
    ['new', '#b5ffff', '#1d6fa5', 'Application, new with this change (thick border)'],
    ['tech', '#c9e7b7', '#4b7f3a', 'Technology: platform, infrastructure, environment'],
    ['legacy', '#dddddd', '#777777', 'Legacy or phase-out'],
    ['temp', '#ffffff', '#888888', 'Temporary or not yet approved (dashed border)'],
    ['ext', '#eeeeee', '#888888', 'Neighbour outside the scope of this view']
  ];
  var HEAT = [['red', '#f5a3a3', 'high'], ['amber', '#ffd591', 'medium'], ['green', '#b7e4b0', 'low']];

  function swatch(fill, stroke, dashed, thick) {
    return '<span class="ab-swatch" style="background:' + fill + ';border:' + (thick ? 3 : 1) + 'px ' +
      (dashed ? 'dashed ' : 'solid ') + stroke + '"></span>';
  }

  // Builds the legend from the Mermaid source, listing only what the diagram uses.
  function buildLegend(src) {
    var items = [];
    var div = document.createElement('div');
    div.className = 'ab-legend';
    if (/^\s*sequenceDiagram/.test(src)) {
      items.push('<span class="ab-line">&#9474;</span> boxes and vertical lines: the participating systems');
      items.push('<span class="ab-line">&#8594;</span> message or call, in time order from top to bottom');
      if (/-->>/.test(src)) {
        items.push('<span class="ab-line">&#8674;</span> response');
      }
      if (/Note over/.test(src)) {
        items.push(swatch('#555', '#555') + ' note');
      }
    } else {
      CLASSES.forEach(function (c) {
        if (new RegExp(':::' + c[0] + '\\b').test(src)) {
          items.push(swatch(c[1], c[2], c[0] === 'temp', c[0] === 'new') + ' ' + c[3]);
        }
      });
      var heat = HEAT.filter(function (h) {
        return new RegExp(':::' + h[0] + '\\b').test(src);
      });
      if (heat.length) {
        items.push('Capability heat (need for change): ' + heat.map(function (h) {
          return swatch(h[1], '#888') + ' ' + h[2];
        }).join(' '));
      }
      if (/\bsubgraph\b/.test(src)) {
        items.push('<span class="ab-swatch ab-frame"></span> frame: boundary or grouping, named at the top');
      }
      if (/-->|--\s[^-]/.test(src)) {
        items.push('<span class="ab-line">&#8594;</span> flow or dependency; the label names the interface or relation');
      }
      if (/<-->/.test(src)) {
        items.push('<span class="ab-line">&#8596;</span> flow in both directions');
      }
      if (/-\.->/.test(src)) {
        items.push('<span class="ab-line">&#8674;</span> temporary, planned or indirect');
      }
      if (/\s---\s/.test(src)) {
        items.push('<span class="ab-line">&#8212;</span> connection without direction');
      }
      if (/\(\[/.test(src)) {
        items.push('<span class="ab-swatch ab-round"></span> rounded: goal, event or interface end point');
      }
      if (/\w\{"/.test(src)) {
        items.push('<span class="ab-line">&#9671;</span> decision');
      }
    }
    items.push('<span class="ab-hint">Click the diagram to enlarge it.</span>');
    div.innerHTML = '<strong>Legend</strong> ' + items.map(function (i) {
      return '<span class="ab-legend-item">' + i + '</span>';
    }).join('');
    return div;
  }

  // Clicking a diagram shows it at full size in an overlay; Escape or a click closes it.
  function enableZoom() {
    document.querySelectorAll('.mermaid svg').forEach(function (svg) {
      svg.style.cursor = 'zoom-in';
      svg.setAttribute('title', 'Click to enlarge');
      svg.addEventListener('click', function () {
        var overlay = document.createElement('div');
        overlay.className = 'ab-zoom';
        var copy = svg.cloneNode(true);
        copy.style.maxWidth = 'none';
        copy.style.width = Math.max(svg.viewBox.baseVal.width, svg.getBoundingClientRect().width * 1.5) + 'px';
        copy.style.cursor = 'zoom-out';
        overlay.appendChild(copy);
        var close = function () {
          overlay.remove();
          document.removeEventListener('keydown', onKey);
        };
        var onKey = function (e) {
          if (e.key === 'Escape') {
            close();
          }
        };
        overlay.addEventListener('click', close);
        document.addEventListener('keydown', onKey);
        document.body.appendChild(overlay);
      });
    });
  }

  // The template colours the header only on scroll; pages opened at an anchor need one initial check.
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (window.jQuery) {
        window.jQuery(window).trigger('scroll');
      }
    }, 100);
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.hasAttribute('data-ab-viewer')) {
      window.abBuildToc();
      if (window.abAnnotateTerms && !document.body.hasAttribute('data-ab-glossary')) {
        window.abAnnotateTerms(document.querySelector('.ab-content'));
      }
      if (window.abLinkIds && !document.body.hasAttribute('data-ab-glossary')) {
        window.abLinkIds(document.querySelector('.ab-content'), null);
      }
      window.abRenderMermaid();
    }
  });
})();
