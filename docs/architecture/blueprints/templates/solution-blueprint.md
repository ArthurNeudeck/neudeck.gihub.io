---
blueprint: solution
profile: solution-full       # solution-full | solution-light
title: "Solution Blueprint <Change>"
adoit_id: ""                 # ADOIT work package / plateau
change_class: change         # deviation | change | initiative
tickets: []                  # Jira / Azure DevOps references
affected_adoit_ids: []       # systems, DPs, interfaces (pre-filled by triage)
predecessor: ""              # reused Solution Blueprint, if any
status: draft                # draft | in-review | approved | implemented | returned | archived
version: 0.1
accountable: ""
responsible: ""
reviewer: ""
last_reviewed: YYYY-MM-DD
---

# Solution Blueprint – <Change>

<!-- LIGHT profile (class "deviation"): chapters 1, 2, 9, 11 and the return checklist only. -->
<!-- FULL profile: all chapters as needed; describe only the DELTA to the living blueprints. -->

## 1 Introduction and goals
### 1.1 Goal of the change
### 1.2 Triage result
| Question area | Result |
|---|---|
| Change class | |
| Affected DPs / domains | |
| Affected capabilities | |
| PII concerned | |

## 2 Constraints (delta)
<!-- Only constraints that are new, changed or not met. Non-compliance requires an ADR. -->

## 3 Context (delta)
<!-- adoit-view: SOLUTION-CONTEXT-ID -->

## 4 Solution strategy

## 5 Building blocks (delta)

## 6 Runtime
## 7 Deployment

## 8 Cross-cutting concepts (optional)
<!-- e.g. data migration: extraction, mapping, reconciliation, parallel operation. -->

## 9 Decisions
| ADR | Title | Type | Target blueprint after return | Status |
|---|---|---|---|---|

## 10 Quality requirements (optional)

## 11 Risks, technical debt, exceptions
| ID | Type | Description | Owner | Expiry / target date | Ticket |
|---|---|---|---|---|---|

## 13 Roadmap and transition (if part of an initiative)
<!-- Which plateau this blueprint delivers. -->

## Return checklist (required before archiving)
- [ ] ADRs moved to the lowest living blueprint covering all parties
- [ ] System Blueprints updated (list)
- [ ] DP / Domain Blueprints updated where affected
- [ ] ADOIT model updated (interfaces, systems, business objects, plateau status)
- [ ] Exceptions and technical debt registered with owners and expiry dates
- [ ] Reuse checked: second reuse of this solution proposed as domain pattern
