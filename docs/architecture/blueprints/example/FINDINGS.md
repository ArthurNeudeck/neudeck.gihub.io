# Findings from the example

Gaps and errors in the method that showed up while writing the Aurora example.
Each finding has a proposal; none is applied to the templates yet.

| ID | Finding | Where it showed up | Proposal |
|---|---|---|---|
| F1 | **Override authority is ambiguous.** "Next-higher level overrides" conflicts with principles and standards owned by a level further up. Can a DP override an enterprise standard? | ADR-SYS-NOVA-002 (STD-LOG-01), ADR-ENT-002 (EP-03) | The owner level of the violated principle or standard decides. It can delegate exception authority downwards for defined risk classes (e.g. low-risk exceptions on STD-LOG-01 delegated to DP level, with the owner consulted). |
| F2 | **"Lowest level covering all parties" pushes too much upwards.** Almost every core-system decision touches cross-domain interfaces and would land at enterprise level. | ADR-DP-001, ADR-ENT-001 | Define "party" as a unit whose blueprint or model content changes. Consumers of a stable interface contract are not parties. ADR-ENT-001 stays enterprise (claims and collections are actively affected), ADR-DP-001 stays DP. |
| F3 | **Shared platforms have no defined place.** EIP, IAM, SIEM, archive serve everyone. Is using them a cross-DP change? | DP-PANL context, SB-001 triage | Platforms are DPs in a platform domain (DOM-TP). Using a platform through its standard offering is not a cross-DP change; changing the platform is. |
| F4 | **No profile for legacy systems.** BEST-NL has no System Blueprint, but it has interfaces, PII and a decommissioning plan. | DP-PANL chapter 5 | Add a "phase-out" profile: context, interfaces, data and retention, decommissioning plan (chapters 1, 3, 11, 13). |
| F5 | **Temporary systems need model objects too.** The migration factory processes PII and has interfaces, but lives only in a Solution Blueprint. | SYS-MIG, IF-09, IF-10 | Temporary systems are modelled in ADOIT with lifecycle "temporary" and an end date; the return checklist retires them. |
| F6 | **Architecture and investment decisions are not linked.** Buying NovaPolicy is a DP-level ADR but an executive-board investment. | ADR-DP-001 | ADR template gets an optional field "portfolio decision reference". |
| F7 | **Data retention after shutdown is not covered.** Claims on old policies need policy data after BEST-NL is gone. | PL-3, SYS-ARC | Chapter 13 of the phase-out profile requires a retention and archive concept; decommissioning cannot be marked reached without it. |
| F8 | **Chapter 13 optional for systems is too weak.** NovaPolicy has a significant roadmap (LoB onboarding, vendor releases). | System Blueprint NovaPolicy | Chapter 13 required for systems with lifecycle other than "stable". |
| F9 | **The programme view is hard to read without an artefact.** We needed the model extract to make the example understandable. | 00-adoit-model-extract.md | Generate a programme view report from ADOIT (plateaus, work packages, Solution Blueprints, open exceptions); no hand-written document. |
| F10 | **Decisions taken during a Solution Blueprint at a higher level.** ADR-ENT-001 to 003 were decided while writing SB-001, but belong to the Enterprise Blueprint from the start. | SB-001 chapter 9 | Clarify: the Solution Blueprint lists such ADRs, but they are owned by their target level immediately; only ADRs of the change's own level move on return. |
| F11 | **Domain pattern candidates need a status.** "LoB migration" is a pattern candidate before its second reuse. | Domain Blueprint chapter 8 | Pattern status: candidate, established, deprecated. |
| F12 | **No check of strategic fit in the triage.** The customer portal served none of the strategic goals; nothing in the method forced this to surface before design started. | SB-005, ADR-ENT-004 | Triage question "Which strategic goal does this change serve?". No goal → escalate to enterprise chapter 1 before the Solution Blueprint is approved. |
| F13 | **Plateaus of different programmes depend on each other.** PL-C1 needs PL-1, PL-C2 needs PL-2. | SB-005 chapter 13 | Model plateau dependencies across programmes in the repository; a delay of a prerequisite plateau shows up in every dependent roadmap. |

## Decisions

- **F1 (decided, 2026-11-16):** Owner of a principle or standard is a function (e.g. CISO,
  Architecture Board), anchored at a level for the cascade; both are ADOIT attributes. The owner
  decides exceptions, delegated via an enterprise-wide default matrix (duration, compensating
  control, data classification) that owners may tighten or loosen per object. Waivers are never
  delegated; gate-error overrides follow the rule owner. Consequence for the example:
  ADR-SYS-NOVA-002 (~19 months, logs with PII) is decided by the CISO, not the DP.
