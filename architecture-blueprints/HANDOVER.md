# Handover: Architecture Blueprint Method

Context for continuing this work in Claude Code. Read this file first.

## Goal
Define architecture target pictures ("Zielbilder") for all levels of an organisation, with
suitable notations, a short process model, de-facto and de-jure standards, a template set,
documentation and an end-to-end example. Context: insurance, fictional "Aurora Versicherung AG"
(Swiss, mid-sized), replacing its in-house non-life policy system with a standard package,
migrated line of business by line of business. Result is to become part of Arthur's website.

## Working mode
Claude acts as a consulting architect and sparring partner: proposes, then questions and
challenges each decision, one step ("Zug") at a time, one question per step.
Website language: English (decided 2026-11-16). All templates, example and documentation in English.

## Where things live
This folder (`architecture-blueprints/`, not published) holds working notes only.
Published content lives under `docs/architecture/` (GitHub Pages serves `docs/`):
- `blueprints/templates/` – Markdown template set (README with rules, profiles, chapter matrix, front matter)
- `blueprints/example/` – Aurora example (model extract, all blueprints, ADRs, FINDINGS.md)
- `index.html`, `method.html`, `tutorial.html`, `scaling.html`, `example.html`, `templates.html` –
  tutorial pages in the site's Lava template; `assets/architecture.css|js`
- `viewer.html` + `assets/viewer.js` – renders the Markdown client-side (marked, DOMPurify, Mermaid
  from jsDelivr); new Markdown files must be added to the `DOCS` list in `viewer.js`
- `glossary.html` + `assets/glossary.js` – single source for abbreviations, standards, method terms
  and ID prefixes; the same data marks the first use of each abbreviation on every page (and in the
  viewer) with a tooltip link. New abbreviations: add them to `glossary.js` with a `match` token.
- Example diagrams: every `adoit-view` marker in the example has a Mermaid stand-in directly below it
  (ArchiMate colours, classDefs biz/app/new/tech/legacy/temp/ext; red/amber/green only for heat).
  The viewer captions it as stand-in; `architecture.js` builds a legend under every diagram from the
  classes and line styles it uses, and allows click-to-enlarge.
- ID links: `assets/ids.js` indexes all example Markdown (definition = own document, else table row
  starting with the ID, else first mention) and links every ID on pages, in the viewer and inside
  diagram labels, opening a new tab (`viewer.html?doc=...&id=...` highlights the row).
  `assets/docs.js` is the shared document list for viewer and index.
- `downloads/*.zip` – rebuild with `architecture-blueprints/build-downloads.sh` after changing Markdown
- `docs/.nojekyll` – required, otherwise Jekyll turns the front-matter Markdown into HTML and the
  viewer cannot fetch it

## Decisions taken (do not reopen without reason)

### Levels and artefacts
| Level | Artefact | Lifetime |
|---|---|---|
| Enterprise | Enterprise Blueprint | living |
| Domain | Domain Blueprint (incl. principles, patterns, ADRs) | living |
| Digital Product (DP) | DP Blueprint (arc42, roadmap, target picture) | living |
| System | System Blueprint (arc42, profiles Buy and Make) | living |
| Change | Solution Blueprint (delta, full or light) | temporary, archived after return |
| Initiative | Programme view in ADOIT (plateaus, gaps, work packages) | temporary, across levels |

- "Living" = continuously maintained; "temporary" = exists for the duration of an initiative/change.
- DPs group systems for cost, planning and accountability; each DP is in exactly one domain.
  Cross-DP interaction is treated like cross-domain involvement (raises the change class).
- One arc42 skeleton for all levels with level profiles:
  ch.1 business goals / strategy / capability heatmap, ch.2 inherited principles and standards,
  ch.3 context, ch.4 own principles and architecture strategy, ch.5 building blocks of the next
  lower level (cascade), ch.8 patterns, ch.9 ADRs, ch.11 risks / tech debt / exceptions,
  ch.13 (extension) roadmap and transition fed from ADOIT plateaus.

### Notation and tooling
- Meta-framework ISO/IEC/IEEE 42010:2022 (de jure). ArchiMate 3.2 and TOGAF (Open Group).
  BPMN 2.0 (ISO/IEC 19510). arc42, MADR/Nygard ADRs, OpenAPI, AsyncAPI (de facto).
  ACORD as insurance reference model.
- All diagrams in ADOIT (ArchiMate). No separate C4 notation; C4 zoom discipline is applied
  inside ArchiMate viewpoints. UML sequence diagrams allowed as exception for runtime views.
- Diagrams embedded into Confluence via plugin; arc42 text as Markdown in Git, later published.
- Rule: everything checked or linked is an ADOIT model object (incl. standards). Documents
  reference ADOIT IDs, never duplicate them. No manual ID linking.
- Minimum modelling depth: systems with aliases and domain/DP assignment, interfaces,
  business objects with data classification, system-to-capability relations, standards.

### Governance and process
- Decisions at the lowest level covering all parties (System → DP → Domain → Enterprise).
- Overrides by the next-higher level: exception + technical debt (temporary, expiry date) or
  waiver (permanent, must lead to a change of the principle). Rationale must be understandable
  for the level below.
- Override authority (F1, decided 2026-11-16; replaces "next-higher level"):
  - Every principle and standard has an owner function (e.g. CISO, Data Protection,
    Architecture Board) and an anchor level for the cascade (e.g. STD-LOG-01: owner CISO,
    anchored at enterprise). Both are attributes of the ADOIT object.
  - The owner decides exceptions. Delegation via one enterprise-wide default matrix:
    ≤ 6 months + compensating control + no data above "internal" → DP;
    ≤ 12 months + compensating control → Domain; everything else → owner.
  - Owners may tighten or loosen the matrix per object (ADOIT attribute).
  - Waivers are never delegated. Overriding a gate error follows the owner of the violated rule.
  - Criteria are deterministic: duration (date to expiry), compensating control (mandatory field),
    data classification (from ADOIT).
- Lower levels may refine principles, never contradict them without waiver.
- Principles cascade: a level's ch.4/ch.8 appear in ch.2 of each blueprint below.
- Quality gate per change: hints (advisory), warnings (acknowledge), errors (block merge and
  publication). Blocking only on deterministic rules; AI findings escalate to errors only after
  human confirmation. Iterative checks on every commit, blocking at merge/publication.
- AI checks text against the ADOIT model (export), not against images.
- Change classes from architecture triage (Arthur's separate questionnaire, ~14 questions,
  treated as black box; runs at Definition of Ready, answers pre-filled from ADOIT where possible):
  Run (ticket, maybe System Blueprint PR), Deviation (light Solution Blueprint + ADR/TD),
  Change (cross-DP/domain, full Solution Blueprint), Initiative (programme view + SB per plateau).
- Solution Blueprint return: ADRs to living blueprints, System/DP/Domain Blueprints updated,
  model updated, then archive. Reuse creates a new blueprint referencing its predecessor;
  repeated reuse becomes a domain pattern.
- Model ownership: DP Manager Business and DP Manager IT accountable (split by object type
  proposed), responsibility delegable to solution architects / lead engineers, a solution
  architect assigned per DP reviews; reviewer never the author.

### Example enhancement: customer portal (decided 2026-11-16)
- New strategic goal SG-5 (digital self-service and direct sales for private customers) and
  ADR-ENT-004 (direct channel with broker-of-record protection), as recommended.
- Further decisions forced by the portal: ADR-ENT-005 (CIAM platform, new standard STD-IAM-02),
  ADR-DOM-002 (policy query API on SYS-PAD with read store), ADR-SOL-005-01 (portal as make).
- SB-005 (full, initiative, plateau PL-C1) holds the delta; return still open. Living blueprints
  updated right away: Enterprise 3.3, Domain PP 2.1, DP-PANL 1.5 (roadmaps), model extract.
- Method page section 8 "Enhancing the target pictures" and Example page section "Enhancement"
  describe the pattern: decisions owned at their level immediately, rest on return, new objects
  modelled as "planned".
- New findings F12 (strategic fit in triage) and F13 (plateau dependencies across programmes).

### Parked
- Zug 7: tool support. Evaluate Backstage (catalog Domain/System/Component/API, TechDocs on
  MkDocs, scorecards) plus custom plugins (ADOIT sync, triage, gate) against a custom build.
  Microservices only with an ADR justifying them.

## Open work (next steps)
1. Decide findings F2–F11 in `docs/architecture/blueprints/example/FINDINGS.md` (F1 decided and applied to
   templates README and ADR template; example ADR-SYS-NOVA-002 not yet adapted. F2 in discussion:
   proposal "parties = units changed by any seriously considered option"), then update templates and example.
2. Add phase-out profile (F4) and temporary model objects (F5) to templates.
3. Done 2026-11-16: method documentation and tutorial published on the website (see above).
   The tutorial states proposals of F3 (platforms), F5 (temporary model objects) and F11
   (pattern status) as recommendations; align when these findings are decided.
4. Done 2026-11-16: website integration. Open: Arthur's review of the texts.
5. Later: Zug 7 (tooling).
