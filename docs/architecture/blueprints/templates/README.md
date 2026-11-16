# Architecture Blueprint Templates

One arc42-based skeleton for all architecture levels, with a profile per level.
Markdown in Git is the master for text; ADOIT is the master for all model elements and diagrams.

## Artefact landscape

| Level | Template | Lifetime |
|---|---|---|
| Enterprise | `enterprise-blueprint.md` | living |
| Domain | `domain-blueprint.md` | living |
| Digital Product (DP) | `dp-blueprint.md` | living |
| System (Buy) | `system-blueprint-buy.md` | living |
| System (Make) | `system-blueprint-make.md` | living |
| Change | `solution-blueprint.md` (full or light) | temporary, archived after return |
| Decisions, all levels | `adr-template.md` | living, stored with the owning blueprint |

The programme view (plateaus, gaps, work packages) is maintained in ADOIT and
appears in chapter 13 of the affected blueprints. It has no template of its own.

## Chapter usage per profile

R = required, O = optional, - = not used

| Chapter | Ent | Dom | DP | Sys Buy | Sys Make | Sol full | Sol light |
|---|---|---|---|---|---|---|---|
| 1 Introduction and goals | R | R | R | R | R | R | R |
| 2 Constraints (inherited) | R | R | R | R | R | R (delta) | R (delta) |
| 3 Context | R | R | R | R | R | R | - |
| 4 Solution strategy (own principles) | R | R | R | O | R | R | - |
| 5 Building blocks | R (domains) | R (DPs) | R (systems) | R (modules, config, extensions) | R (components) | R | - |
| 6 Runtime | - | O | O | R | R | R | - |
| 7 Deployment | - | - | O | R | R | R | - |
| 8 Cross-cutting concepts / patterns | R | R | R | O | R | O | - |
| 9 Decisions (ADR index) | R | R | R | R | R | R | R |
| 10 Quality requirements | R | O | R | R | R | O | - |
| 11 Risks, technical debt, exceptions | R | R | R | R | R | R | R |
| 12 Glossary | O | O | O | O | O | - | - |
| 13 Roadmap and transition (extension) | R | R | R | O | O | R if part of an initiative | - |

## Core rules

1. **Model first.** Everything that is checked or linked is an ADOIT object: domains, DPs,
   systems (with aliases), interfaces, business objects (with data classification),
   capabilities, principles, standards. Documents reference ADOIT IDs, never duplicate them.
2. **Diagrams live in ADOIT.** Embed them with `<!-- adoit-view: VIEW-ID -->`; the build
   pipeline replaces the marker with the current export.
3. **Cascade of principles.** What a level defines in chapters 4 and 8 appears in chapter 2
   of every blueprint below it. The gate checks this.
4. **Decisions at the lowest level that covers all parties** (System, DP, Domain, Enterprise).
5. **The owner of a principle or standard decides on deviations from it**, as an exception with
   technical debt (temporary) or a waiver (permanent, forces a change of the principle). Every
   principle and standard has an owner function (e.g. CISO, Architecture Board) and an anchor
   level; both are repository attributes. Exceptions may be delegated by the default matrix below;
   waivers are never delegated. See `adr-template.md`.
6. **Return before archive.** A Solution Blueprint is archived only after its decisions and
   changes are returned to the living blueprints. Reuse creates a new blueprint referencing its
   predecessor; repeated reuse becomes a pattern in the Domain Blueprint.

## Change classes (result of the architecture triage)

| Class | Trigger | Artefact |
|---|---|---|
| Run | ticket within one system or DP | pull request on System / DP Blueprint |
| Deviation | principle or standard not met | Solution Blueprint light + ADR / technical debt |
| Change | across DPs or domains | Solution Blueprint full (tailored) |
| Initiative | programme | programme view in ADOIT + Solution Blueprint per plateau |

## Quality gate

| Severity | Effect | Source |
|---|---|---|
| Hint | advisory | AI |
| Warning | must be acknowledged in the pull request | AI or rules |
| Error | blocks merge and publication | deterministic rules; AI only after human confirmation |

Override of an error: the owner of the violated rule (or the delegated level), via ADR.

## Delegation of exceptions (default matrix)

| Exception | Decided by |
|---|---|
| up to 6 months, compensating control, no data above "internal" | DP level |
| up to 12 months, compensating control | Domain level |
| everything else, and every waiver | owner of the principle or standard |

Owners may tighten or loosen the matrix per principle or standard (repository attribute).
All criteria are checked deterministically: duration (date to expiry), compensating control
(required field), data classification (from the model).

## Front matter (all blueprints)

```yaml
---
blueprint: system            # enterprise | domain | dp | system | solution
profile: buy                 # enterprise | domain | dp | buy | make | solution-full | solution-light
title: ""
adoit_id: ""                 # ADOIT ID of the described object
parent_adoit_id: ""          # next-higher level
domain: ""
digital_product: ""
status: draft                # draft | in-review | approved | archived
version: 0.1
accountable: ""              # e.g. DP Manager IT
responsible: ""              # delegated author
reviewer: ""                 # never identical to responsible
last_reviewed: YYYY-MM-DD
---
```
