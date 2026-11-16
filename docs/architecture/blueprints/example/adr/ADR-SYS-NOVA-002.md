---
adr_id: ADR-SYS-NOVA-002
title: "Daily audit log delivery to SIEM until vendor release 2028.1"
type: exception
level: system
owning_blueprint: 04-system-blueprint-novapolicy.md
status: accepted
date: 2026-11-04
deciders: [L. Weber (DP level, overriding), CISO (standard owner, consulted)]
---

# Daily audit log delivery to SIEM until vendor release 2028.1

## Context and problem
STD-LOG-01 requires security logs in the SIEM within 15 minutes. NovaPolicy supports only
daily exports until release 2028.1.

## Decision
Accept daily delivery with compensating control (vendor SOC alerts forwarded immediately).

## Exception details
| Field | Value |
|---|---|
| Overridden standard (ADOIT ID) | STD-LOG-01 |
| Overriding level | DP (next-higher level), standard owner consulted (see FINDINGS F1) |
| Expiry date | 2028-06-30 |
| Technical debt ticket | TD-PANL-004 |
| Path back to compliance | vendor release 2028.1 with streaming |

## Rationale for the level below
Motor go-live cannot wait for the vendor release; the compensating control covers the most
critical events.
