---
adr_id: ADR-SOL-005-01
title: "Customer portal as own development"
type: decision
level: dp                    # created in SB-005, moves to the DP Blueprint DP-CSP on return
owning_blueprint: 08-solution-blueprint-customer-portal.md
status: accepted
date: 2026-11-16
deciders: [F. Bucher (DP Manager Business DP-CSP), M. Rossi (DP Manager IT DP-CSP), S. Frei]
---

# Customer portal as own development

## Context and problem
EP-01 asks for buy before make; a make decision needs an ADR. Customer journeys are
differentiating for Aurora (enterprise strategy 4.1).

## Considered options
1. Portal module of NovaPolicy: covers only lines already on NovaPolicy, vendor user experience.
2. A digital experience platform with insurance add-ons: licence cost, still needs integration of
   both policy systems.
3. Own development on Aurora private cloud, reusing the design system and front-end stack of the
   Broker Portal.

## Decision
Option 3.

## Consequences
- Same team skills and stack as the Broker Portal; shared components for quote and bind.
- Aurora carries the full maintenance; the portal integrates only through APIs (IF-12 to IF-16).

## Rationale for the level below
The customer journey is where Aurora wants to differ; the portal is built in-house, everything
behind it is reused through APIs.
