---
adr_id: ADR-ENT-002
title: "Two systems of record for policies during migration, partitioned by LoB"
type: exception
level: enterprise
owning_blueprint: 01-enterprise-blueprint-aurora.md
status: accepted
date: 2026-03-12
deciders: [Architecture Board]
---

# Two systems of record for policies during migration, partitioned by LoB

## Context and problem
During PL-1 and PL-2, motor policies live in NovaPolicy, the other LoB in BEST-NL.
EP-03 demands exactly one system of record per business object.

## Decision
Temporarily accepted. For every LoB there is exactly one system of record at any time; the
routing table in SYS-PAD is the authoritative source for which system holds which LoB.

## Consequences
Consumers must never read policies directly from either system; only via SYS-PAD / EIP.

## Exception details
| Field | Value |
|---|---|
| Overridden principle (ADOIT ID) | EP-03 |
| Overriding level | Enterprise (owner of EP-03, see FINDINGS F1) |
| Expiry date | PL-3, Q2 2029 |
| Technical debt ticket | TD-PANL-001 |
| Path back to compliance | decommissioning of BEST-NL (WP-5) |

## Rationale for the level below
A single system of record would require a big-bang migration of all non-life LoB, which the
strategy rules out. The routing table keeps the situation controlled and visible.
