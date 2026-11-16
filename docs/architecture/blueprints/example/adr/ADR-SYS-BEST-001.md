---
adr_id: ADR-SYS-BEST-001
title: "Broker document inbox of BEST-NL without malware scanning until decommissioning"
type: exception
level: system
owning_blueprint: 03-dp-blueprint-policy-admin-nonlife.md   # BEST-NL has no System Blueprint (FINDINGS F4)
status: accepted
date: 2026-11-16
deciders: [CISO (owner of STD-SEC-01, deciding per delegation matrix), T. Brunner (requesting, DP Manager IT DP-PANL)]
---

# Broker document inbox of BEST-NL without malware scanning until decommissioning

## Context and problem
The STD-SEC-01 rollout found an entry point that was not in the model: twelve brokers upload
policy documents by SFTP directly into BEST-NL (now modelled as IF-18). The files are not
scanned. BEST-NL is decommissioned at PL-3 (Q2 2029); connecting the inbox to SYS-SCAN would
need changes to a system in phase-out.

## Considered options
1. Connect the SFTP inbox to SYS-SCAN: about four months of work on a phase-out system.
2. Move the twelve brokers to the Broker Portal now: brokers' processes change twice within two years.
3. Accept the gap until PL-3 with a compensating control.

## Decision
Option 3.

## Exception details
| Field | Value |
|---|---|
| Overridden principle / standard (ADOIT ID) | STD-SEC-01 |
| Owner function of the principle / standard | CISO |
| Deciding level (owner or delegated level per matrix) | owner: duration about 30 months (above 12), data confidential (above internal) |
| Compensating control | nightly scan of the inbox directory with the SYS-SCAN engine; the BEST-NL import now runs only after the scan; inbox limited to twelve named brokers |
| Expiry date | 2029-06-30 (PL-3) |
| Technical debt ticket | TD-PANL-005 |
| Path back to compliance | decommissioning of BEST-NL; from PL-2 the brokers use the Broker Portal |

## Rationale for the level below
The gap is closed by the end of BEST-NL, not by investing in it. Until then the files are scanned
every night before import, and only known brokers can upload.
