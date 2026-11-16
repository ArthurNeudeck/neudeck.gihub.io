---
blueprint: solution
profile: solution-light
title: "Solution Blueprint SB-004 NovaPolicy audit logging"
adoit_id: IF-08
change_class: deviation
tickets: [PANL-231]
affected_adoit_ids: [SYS-NOVA, SYS-SIEM, IF-08, STD-LOG-01]
predecessor: ""
status: returned
version: 1.0
accountable: "T. Brunner, DP Manager IT"
responsible: "lead engineer PANL"
reviewer: "L. Weber, solution architect DP-PANL"
last_reviewed: 2026-11-04
---

# Solution Blueprint SB-004 – NovaPolicy audit logging (light)

## 1 Introduction and goals
### 1.1 Goal of the change
Connect NovaPolicy audit logs to the Aurora SIEM before motor go-live.

### 1.2 Triage result
| Question area | Result |
|---|---|
| Change class | deviation (standard STD-LOG-01 not met) |
| Affected DPs / domains | DP-PANL, DP-SEC |
| Affected capabilities | none |
| PII concerned | yes (user IDs, policy numbers in logs) |

## 2 Constraints (delta)
| ADOIT ID | Constraint | Status |
|---|---|---|
| STD-LOG-01 | security logs to SIEM within 15 minutes | not met: NovaPolicy delivers daily files until vendor release 2028.1 |

## 9 Decisions
| ADR | Title | Type | Target blueprint after return | Status |
|---|---|---|---|---|
| ADR-SYS-NOVA-002 | daily audit log delivery until vendor release 2028.1 | exception | System Blueprint NovaPolicy | accepted, returned |

## 11 Risks, technical debt, exceptions
| ID | Type | Description | Owner | Expiry / target date | Ticket |
|---|---|---|---|---|---|
| EXC-PANL-001 | exception | daily instead of 15 minutes | T. Brunner | 2028-06-30 | TD-PANL-004 |
| R-SB4-01 | risk | delayed detection of misuse in NovaPolicy | CISO | compensating control: vendor SOC alerts forwarded by mail | PANL-232 |

## Return checklist (required before archiving)
- [x] ADR moved to System Blueprint NovaPolicy
- [x] System Blueprint NovaPolicy updated (chapter 2, 3, 9, 11)
- [ ] DP / Domain Blueprints updated: not required
- [x] ADOIT model updated: IF-08 with lifecycle "until vendor release 2028.1"
- [x] Exception and technical debt registered (EXC-PANL-001, TD-PANL-004)
- [x] Reuse checked: not applicable
