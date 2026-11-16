---
adr_id: ADR-DOM-002
title: "Policy query API on the Policy Adapter Layer, served from a canonical read store"
type: decision
level: domain
owning_blueprint: 02-domain-blueprint-product-policy.md
status: accepted
date: 2026-11-16
deciders: [N. Fischer (domain architect DOM-PP), T. Brunner (DP Manager IT DP-PANL), S. Frei (solution architect DP-CSP, consulted)]
---

# Policy query API on the Policy Adapter Layer, served from a canonical read store

## Context and problem
The customer portal must show all non-life policies of a customer, synchronously. Until PL-3,
policies live in two systems of record partitioned by line of business (ADR-ENT-002), and
consumers must never read either system directly (DPP-02). SYS-PAD offers only events (IF-03) and
nightly files (IF-04, IF-05) today.

## Considered options
1. Portal reads NovaPolicy and BEST-NL directly: violates ADR-ENT-002 and DPP-02.
2. SYS-PAD forwards each query synchronously to the system of record of the line of business:
   loads BEST-NL with online traffic and couples portal availability to both policy systems.
3. SYS-PAD builds a canonical read store from IF-01 and IF-02 and serves a query API (IF-12)
   from it.

## Decision
Option 3. The read store holds the canonical format `policy.nonlife.v1`; the query API is
published via the EIP gateway (STD-API-01).

## Consequences
- New components in SYS-PAD: read store and query API. Data is current within one minute.
- SYS-PAD becomes part of a customer-facing path: its availability target rises (to be set in
  SB-005, chapter 10).
- After PL-3 the read store stays; the portal does not notice the end of BEST-NL.

## Rationale for the level below
Consumers get one stable API for all non-life policies, whichever system holds them. The domain
keeps its promise that policy system changes do not reach other domains.
