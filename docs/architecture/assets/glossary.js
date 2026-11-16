/* Glossary of the Architecture Blueprint pages: rendered on glossary.html and used for term tooltips. */
(function () {
  'use strict';

  // match: tokens annotated on first use in page text (case-sensitive, whole word, plural "s" allowed).
  window.AB_GLOSSARY = [
    // Abbreviations
    { kind: 'abbr', term: 'ADR', full: 'Architecture Decision Record', match: ['ADR'],
      text: 'A short document that records one architecture decision with its context, the options considered and the consequences. In this method there are three types: decision, exception and waiver.' },
    { kind: 'abbr', term: 'AG', full: 'Aktiengesellschaft',
      text: 'Swiss and German legal form of a public limited company.' },
    { kind: 'abbr', term: 'AI', full: 'Artificial intelligence', match: ['AI'],
      text: 'Here: checks based on language models that compare blueprint text with the model export and report hints or warnings.' },
    { kind: 'abbr', term: 'API', full: 'Application Programming Interface', match: ['API'],
      text: 'A defined interface through which one system calls another.' },
    { kind: 'abbr', term: 'CDC', full: 'Change Data Capture', match: ['CDC'],
      text: 'A technique that streams changes from a database to other systems as they happen.' },
    { kind: 'abbr', term: 'CH', full: 'Switzerland (Confoederatio Helvetica)',
      text: 'Country code of Switzerland, used e.g. for "Swiss region" hosting.' },
    { kind: 'abbr', term: 'CIAM', full: 'Customer Identity and Access Management', match: ['CIAM'],
      text: 'Identity management for customers rather than employees: self-registration, login, multi-factor authentication and consent. In the example a central platform service (ADR-ENT-005).' },
    { kind: 'abbr', term: 'CIO', full: 'Chief Information Officer', match: ['CIO'],
      text: 'Executive responsible for information technology.' },
    { kind: 'abbr', term: 'CISO', full: 'Chief Information Security Officer', match: ['CISO'],
      text: 'Executive responsible for information security. In the method a typical owner function of security standards.' },
    { kind: 'abbr', term: 'CMDB', full: 'Configuration Management Database', match: ['CMDB'],
      text: 'The inventory of systems and infrastructure maintained by IT operations. A good source for the initial system list in the repository.' },
    { kind: 'abbr', term: 'CRM', full: 'Customer Relationship Management', match: ['CRM'],
      text: 'Systems and processes for managing customer and partner data.' },
    { kind: 'abbr', term: 'CTO', full: 'Chief Technology Officer', match: ['CTO'],
      text: 'Executive responsible for technology; in small companies often also the chief architect.' },
    { kind: 'abbr', term: 'DP', full: 'Digital Product', match: ['DP'],
      text: 'A group of systems that together deliver one business outcome and are planned, funded and owned together. Every DP belongs to exactly one domain.' },
    { kind: 'abbr', term: 'EIP', full: 'Enterprise Integration Platform', match: ['EIP'],
      text: 'In the example: Aurora\'s API gateway and event broker, through which systems integrate.' },
    { kind: 'abbr', term: 'FINMA', full: 'Swiss Financial Market Supervisory Authority', match: ['FINMA'],
      text: 'The Swiss regulator for banks, insurers and other financial institutions. Its rules on outsourcing and operational resilience appear as constraints in the example.',
      link: 'https://www.finma.ch/en/' },
    { kind: 'abbr', term: 'IAM', full: 'Identity and Access Management', match: ['IAM'],
      text: 'Central management of users, authentication and permissions.' },
    { kind: 'abbr', term: 'ID', full: 'Identifier',
      text: 'A stable, unique key of a model object, e.g. SYS-NOVA. IDs are never reused.' },
    { kind: 'abbr', term: 'LoB', full: 'Line of Business', match: ['LoB'],
      text: 'A product line of an insurer, e.g. motor, household or liability insurance.' },
    { kind: 'abbr', term: 'OIDC', full: 'OpenID Connect', match: ['OIDC'],
      text: 'A standard protocol for authentication and single sign-on, built on OAuth 2.0.',
      link: 'https://openid.net/connect/' },
    { kind: 'abbr', term: 'PII', full: 'Personally Identifiable Information', match: ['PII'],
      text: 'Data that identifies a person directly or indirectly, protected by data protection law.' },
    { kind: 'abbr', term: 'REST', full: 'Representational State Transfer', match: ['REST'],
      text: 'The common architectural style for HTTP-based APIs.' },
    { kind: 'abbr', term: 'revFADP', full: 'revised Swiss Federal Act on Data Protection', match: ['revFADP'],
      text: 'The Swiss data protection law, in force since September 2023.' },
    { kind: 'abbr', term: 'SaaS', full: 'Software as a Service', match: ['SaaS'],
      text: 'Software operated by the vendor and used over the internet; the customer does not install or run it.' },
    { kind: 'abbr', term: 'SFTP', full: 'SSH File Transfer Protocol', match: ['SFTP'],
      text: 'A protocol for transferring files over an encrypted connection. In the example, brokers upload documents into BEST-NL this way.' },
    { kind: 'abbr', term: 'SIEM', full: 'Security Information and Event Management', match: ['SIEM'],
      text: 'A central system that collects and analyses security logs to detect attacks and misuse.' },
    { kind: 'abbr', term: 'SOC', full: 'Security Operations Center', match: ['SOC'],
      text: 'The team (internal or at a provider) that monitors security events and responds to incidents.' },
    { kind: 'abbr', term: 'SSO', full: 'Single Sign-On', match: ['SSO'],
      text: 'One login for many applications.' },
    { kind: 'abbr', term: 'YAML', full: 'YAML Ain\'t Markup Language', match: ['YAML'],
      text: 'A human-readable data format. Used for the front matter at the top of each blueprint.' },

    // Standards, methods and tools
    { kind: 'std', term: 'ACORD', full: 'Association for Cooperative Operations Research and Development', match: ['ACORD'],
      text: 'A non-profit standards organisation of the insurance industry. Its reference models (capabilities, business objects, data and messages) give insurers a common vocabulary; the example uses it for the capability map and the canonical policy format.',
      link: 'https://www.acord.org' },
    { kind: 'std', term: 'ADOIT', full: 'Enterprise architecture management tool by BOC Group', match: ['ADOIT'],
      text: 'A commercial architecture repository with ArchiMate support. The example uses it as the master for all model objects and diagrams; any ArchiMate repository can take its place.',
      link: 'https://www.boc-group.com/en/adoit/' },
    { kind: 'std', term: 'arc42', full: 'Template for architecture documentation', match: ['arc42'],
      text: 'A free, widely used template with twelve chapters (goals, constraints, context, solution strategy, building blocks, runtime, deployment, concepts, decisions, quality, risks, glossary). Every blueprint in this method follows it, with a thirteenth chapter for roadmap and transition.',
      link: 'https://arc42.org' },
    { kind: 'std', term: 'ArchiMate', full: 'Modelling language for enterprise architecture (The Open Group)', match: ['ArchiMate'],
      text: 'A standard notation for describing strategy, business, applications, technology and migration in one connected model. Version 3.2 is current. All diagrams in this method are ArchiMate views.',
      link: 'https://www.opengroup.org/archimate-forum/archimate-overview' },
    { kind: 'std', term: 'AsyncAPI', full: 'Specification for event-driven APIs', match: ['AsyncAPI'],
      text: 'A machine-readable format for describing message- and event-based interfaces, the counterpart of OpenAPI for asynchronous communication.',
      link: 'https://www.asyncapi.com' },
    { kind: 'std', term: 'BPMN', full: 'Business Process Model and Notation', match: ['BPMN'],
      text: 'The standard notation for business processes (ISO/IEC 19510). Used where a domain needs to show end-to-end processes.',
      link: 'https://www.omg.org/spec/BPMN/' },
    { kind: 'std', term: 'C4 model', full: 'Diagram approach by Simon Brown', match: ['C4'],
      text: 'Software architecture diagrams at four zoom levels: context, containers, components and code. The method borrows its zoom discipline but draws everything in ArchiMate.',
      link: 'https://c4model.com' },
    { kind: 'std', term: 'CloudEvents', full: 'Specification for event metadata (CNCF)', match: ['CloudEvents'],
      text: 'A common envelope format for events, so that every event carries the same basic attributes such as source, type and time.',
      link: 'https://cloudevents.io' },
    { kind: 'std', term: 'ISO/IEC/IEEE 42010', full: 'International standard for architecture descriptions', match: ['42010'],
      text: 'Defines what an architecture description contains: stakeholders, their concerns, viewpoints and views. It is the meta-framework of this method.',
      link: 'https://www.iso.org/standard/74393.html' },
    { kind: 'std', term: 'MADR', full: 'Markdown Architectural Decision Records', match: ['MADR'],
      text: 'A Markdown template for ADRs with sections for context, options, decision and consequences.',
      link: 'https://adr.github.io/madr/' },
    { kind: 'std', term: 'Nygard ADR', full: 'ADR format by Michael Nygard', match: ['Nygard'],
      text: 'The original lightweight ADR format from 2011: title, context, decision, status, consequences.',
      link: 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions' },
    { kind: 'std', term: 'OpenAPI', full: 'Specification for HTTP APIs', match: ['OpenAPI'],
      text: 'A machine-readable format for describing synchronous HTTP interfaces; the basis for documentation, tests and code generation.',
      link: 'https://www.openapis.org' },
    { kind: 'std', term: 'TOGAF', full: 'The Open Group Architecture Framework', match: ['TOGAF'],
      text: 'A widely used framework and method for enterprise architecture. This method takes its migration vocabulary from it: plateau, gap and work package.',
      link: 'https://www.opengroup.org/togaf' },
    { kind: 'std', term: 'UML', full: 'Unified Modeling Language', match: ['UML'],
      text: 'A standard notation for software models. The method allows its sequence diagrams as an exception for runtime views.',
      link: 'https://www.omg.org/spec/UML/' },
    { kind: 'std', term: 'Git', full: 'Version control system', match: ['Git'],
      text: 'Stores the blueprint texts with full history. Changes are proposed as pull requests, reviewed and merged; the quality gate runs on each of them.',
      link: 'https://git-scm.com' },
    { kind: 'std', term: 'Markdown', full: 'Plain-text formatting syntax',
      text: 'A simple text format with headings, lists and tables. All templates and blueprints are written in Markdown.' },

    // Terms of the method
    { kind: 'term', term: 'Alias', text: 'An alternative name of a system as people actually say it ("Nova", "the new policy system"). Stored in the repository so that checks can connect text to model objects.' },
    { kind: 'term', term: 'Anchor level', text: 'The level (enterprise, domain, DP, system) at which a principle or standard enters the cascade.' },
    { kind: 'term', term: 'Architecture Board', text: 'The body of senior architects, chaired by the chief architect, that owns the Enterprise Blueprint and decides cross-domain questions.' },
    { kind: 'term', term: 'Architecture repository', text: 'The tool that holds the model: systems, interfaces, business objects, capabilities, principles, standards and their relations. Master for all model objects and diagrams.' },
    { kind: 'term', term: 'Blueprint', text: 'The documented target picture of one level or one change. Living blueprints are maintained continuously; Solution Blueprints are temporary.' },
    { kind: 'term', term: 'Business object', text: 'A business information entity such as policy, claim or premium, with data classification and system of record.' },
    { kind: 'term', term: 'Capability', text: 'Something the business is able to do, such as "policy administration", independent of organisation and systems. A capability map shows them all; a heatmap colours them by need for change.' },
    { kind: 'term', term: 'Cascade', text: 'The flow of principles and patterns from a level to every level below: what a level defines in chapters 4 and 8 appears in chapter 2 of each blueprint underneath.' },
    { kind: 'term', term: 'Change class', text: 'The result of the architecture triage: Run, Deviation, Change or Initiative. It decides which artefact a change needs.' },
    { kind: 'term', term: 'Compensating control', text: 'A measure that reduces the risk of a deviation while it lasts, e.g. forwarding critical alerts immediately while logs are only delivered daily.' },
    { kind: 'term', term: 'Cutover', text: 'The switch of a line of business from the old to the new system, typically over one weekend.' },
    { kind: 'term', term: 'Data classification', text: 'The protection level of a business object, e.g. internal, confidential, strictly confidential.' },
    { kind: 'term', term: 'Definition of Ready / Done', text: 'Agreements in agile teams on when work may start (ready) and when it counts as finished (done). The triage belongs to the first, the return checklist to the second.' },
    { kind: 'term', term: 'Delegation matrix', text: 'The default rule that lets the DP or domain level decide short, low-risk exceptions instead of the owner. Owners may tighten or loosen it.' },
    { kind: 'term', term: 'Domain', text: 'A business area cut along capabilities, e.g. Product & Policy or Claims. Owns a Domain Blueprint and groups digital products.' },
    { kind: 'term', term: 'Equivalent control', text: 'A control operated by a provider that achieves what a standard requires, accepted instead of Aurora\'s own control if it is contractually agreed and evidenced, e.g. malware scanning inside a SaaS system.' },
    { kind: 'term', term: 'Exception', text: 'A temporary, approved deviation from a principle or standard, with expiry date, compensating control and path back to compliance.' },
    { kind: 'term', term: 'Front matter', text: 'The block of metadata between two "---" lines at the top of a Markdown file: level, profile, status, owners, reviewer.' },
    { kind: 'term', term: 'Gap', text: 'The difference between two plateaus: what is added, changed or retired.' },
    { kind: 'term', term: 'Lifecycle', text: 'The status of a system or interface: target, stable, legacy, phase-out or temporary.' },
    { kind: 'term', term: 'Owner function', text: 'The role that owns a principle or standard and decides deviations from it, e.g. CISO or Architecture Board.' },
    { kind: 'term', term: 'Pattern', text: 'A proven, reusable solution to a recurring problem, offered by a domain or the enterprise in chapter 8.' },
    { kind: 'term', term: 'Plateau', text: 'A stable intermediate state on the way to the target, in which the organisation could operate for months.' },
    { kind: 'term', term: 'Principle', text: 'A lasting rule that guides decisions, with statement, rationale and implications, e.g. "buy before make".' },
    { kind: 'term', term: 'Profile', text: 'The variant of the template for a level or case: enterprise, domain, DP, Buy, Make, Solution full or light. It defines which chapters are required.' },
    { kind: 'term', term: 'Programme view', text: 'The plateaus, gaps and work packages of an initiative, modelled in the repository and reported from there.' },
    { kind: 'term', term: 'Pull request', text: 'A proposed change to files in Git that is reviewed and checked before it is merged.' },
    { kind: 'term', term: 'Quality gate', text: 'Automated checks on every change of a blueprint, with three severities: hint, warning and error. Only errors block.' },
    { kind: 'term', term: 'Return', text: 'The step that moves decisions and changes of a finished Solution Blueprint into the living blueprints and the model, before archiving.' },
    { kind: 'term', term: 'Standard', text: 'A concrete, checkable rule, e.g. "security logs reach the SIEM within 15 minutes", with a rule stating when it applies.' },
    { kind: 'term', term: 'System of record', text: 'The system that holds the authoritative version of a business object.' },
    { kind: 'term', term: 'Target picture', text: 'The intended future state of the architecture at a level. In German "Zielbild".' },
    { kind: 'term', term: 'Technical debt', text: 'A known shortcoming accepted for now, registered with an owner and a ticket so it is paid back later.' },
    { kind: 'term', term: 'Triage', text: 'The short questionnaire at Definition of Ready that classifies a change and pre-fills what is affected from the repository.' },
    { kind: 'term', term: 'Vertical slice', text: 'Introducing the method along one real change through all levels it touches, instead of completing one level at a time.' },
    { kind: 'term', term: 'Waiver', text: 'A permanent deviation from a principle. It forces the principle to be changed by a deadline.' },
    { kind: 'term', term: 'Work package', text: 'A unit of work that closes part of a gap and delivers a plateau.' }
  ];

  // ID prefixes used in the Aurora example.
  window.AB_ID_PREFIXES = [
    ['ENT-', 'enterprise (ENT-AUR = Aurora)'], ['SG-', 'strategic goal'], ['CAP-', 'capability'],
    ['DOM-', 'domain'], ['DP-', 'digital product'], ['SYS-', 'system'], ['IF-', 'interface'],
    ['BO-', 'business object'], ['EP-', 'enterprise principle'], ['DPP-', 'domain principle of Product & Policy'],
    ['STD-', 'standard'], ['REG-', 'regulatory constraint'], ['PL-', 'plateau (PL-C1, PL-C2: programme Customer Self-Service)'], ['WP-', 'work package'],
    ['SB-', 'Solution Blueprint'], ['ADR-ENT-, ADR-DOM-, ADR-DP-, ADR-SYS-, ADR-SOL-', 'decision record of the enterprise, domain, DP, system or solution level'],
    ['EXC-', 'registered exception'], ['TD-', 'technical debt ticket'], ['R-', 'risk'],
    ['OA-', 'outsourcing assessment'], ['PF-', 'portfolio (investment) decision']
  ];

  window.abSlug = function (text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  // Marks the first use of each abbreviation or standard in the root with a link to the glossary.
  window.abAnnotateTerms = function (root) {
    if (!root) {
      return;
    }
    var entries = window.AB_GLOSSARY.filter(function (e) {
      return e.match;
    });
    var done = {};
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) {
      var p = walker.currentNode.parentElement;
      if (!p.closest('a, pre, code, h1, h2, h3, h4, .mermaid, .ab-frontmatter, .ab-meta dt')) {
        nodes.push(walker.currentNode);
      }
    }
    nodes.forEach(function (node) {
      // Repeatedly take the earliest first-use in the remaining text of this node.
      while (node) {
        var best = null;
        entries.forEach(function (e) {
          if (done[e.term]) {
            return;
          }
          e.match.forEach(function (token) {
            var re = new RegExp('(^|[^\\w-])(' + token + 's?)(?![\\w-])');
            var m = re.exec(node.nodeValue);
            if (m && (!best || m.index + m[1].length < best.start)) {
              best = { entry: e, start: m.index + m[1].length, length: m[2].length };
            }
          });
        });
        if (!best) {
          return;
        }
        var hit = node.splitText(best.start);
        var rest = hit.splitText(best.length);
        var a = document.createElement('a');
        a.className = 'ab-term';
        a.href = 'glossary.html#' + window.abSlug(best.entry.term);
        a.title = (best.entry.full ? best.entry.full + ': ' : '') + best.entry.text;
        a.textContent = hit.nodeValue;
        hit.parentNode.replaceChild(a, hit);
        done[best.entry.term] = true;
        node = rest;
      }
    });
  };
})();
