---
adr_id: ADR-SOL-001-01
title: "Active migration at cutover instead of migration at renewal"
type: decision
level: dp                    # created in SB-001, moves to DP-PANL on return
owning_blueprint: 06-solution-blueprint-p1-motor-migration.md
status: accepted
date: 2026-09-10
deciders: [L. Weber, A. Meier, T. Brunner]
---

# Active migration at cutover instead of migration at renewal

## Context and problem
Motor policies could move to NovaPolicy at their renewal date (spread over 12 months) or all at
once at a cutover weekend.

## Considered options
1. Migration at renewal: low risk per policy, but 12 months of mixed state within one LoB.
2. Active migration at cutover: one LoB is in exactly one system at any time.

## Decision
Option 2. It keeps ADR-ENT-002 manageable (partition by LoB stays clean).

## Consequences
Migration factory and three dress rehearsals needed. Becomes part of the domain pattern
"LoB migration to NovaPolicy" once reused by SB-002.
