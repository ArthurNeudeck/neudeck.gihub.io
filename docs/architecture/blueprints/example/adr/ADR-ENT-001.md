---
adr_id: ADR-ENT-001
title: "Claims and collections stay on legacy and are fed by the policy domain"
type: decision
level: enterprise
owning_blueprint: 01-enterprise-blueprint-aurora.md
status: accepted
date: 2026-03-12
deciders: [Architecture Board, domain architects DOM-PP, DOM-CL, DOM-FC]
---

# Claims and collections stay on legacy and are fed by the policy domain

## Context and problem
Replacing BEST-NL changes the source of policy and billing data for SCHADEN-2000 and INKA.
Neither claims nor collections has budget or capacity to change before 2029.

## Considered options
1. Claims and collections adapt to NovaPolicy formats in time for each cutover.
2. Policy domain delivers legacy formats from the new system (pattern "Legacy-format feed").
3. Postpone the policy replacement until claims is replaced.

## Decision
Option 2. SYS-PAD generates IF-04 and IF-05 in the BEST-NL format for all LoB, regardless of
the system of record.

## Consequences
- Claims and collections roadmaps stay independent (DPP-02).
- File feeds are direct transfers, a partial violation of EP-02, accepted as TD-PANL-002 until
  the consumers are modernised.
- Decided at enterprise level because three domains are parties (see FINDINGS F2).
