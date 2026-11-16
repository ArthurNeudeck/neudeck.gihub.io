---
adr_id: ADR-ENT-004
title: "Direct digital channel for private customers, with broker-of-record protection"
type: decision
level: enterprise
owning_blueprint: 01-enterprise-blueprint-aurora.md
status: accepted
date: 2026-11-16
deciders: [Executive board (strategy, portfolio decision PF-2026-11), Architecture Board]
---

# Direct digital channel for private customers, with broker-of-record protection

## Context and problem
Customers ask to see their policies online and to buy simple products without an intermediary.
Aurora sells non-life almost entirely through brokers and tied agents (SG-3). A customer portal
with online bind competes with these channels. None of SG-1 to SG-4 covered a direct channel, so
the demand for a customer portal could not be placed against the strategy.

## Considered options
1. Self-service only: customers see policies and report changes; every new contract goes through
   a broker or agent.
2. Full direct sales: any customer can quote and bind online.
3. Direct sales for customers without a broker; customers with a broker of record see their
   policies, and their quote requests are routed to that broker.

## Decision
Option 3. The executive board adds strategic goal SG-5 (digital self-service and direct sales for
private customers). Brokered business stays with the broker.

## Consequences
- New strategic goal SG-5; CAP-06 and CAP-07 are linked to it, CAP-07 becomes amber.
- BO-PRT gets the attribute "broker of record"; the portal must check it before offering bind.
- New interface IF-16: quote requests of brokered customers go to the Broker Portal.
- Commission rules are unchanged; brokers are informed before go-live (risk R-ENT-02).
- Realised by the programme "Customer Self-Service" (PL-C1, PL-C2) and SB-005, funded by
  portfolio decision PF-2026-11.

## Rationale for the level below
Aurora wants to serve customers who come online without a broker, without taking business away
from its brokers. Every team building on the portal must respect the broker-of-record check.
