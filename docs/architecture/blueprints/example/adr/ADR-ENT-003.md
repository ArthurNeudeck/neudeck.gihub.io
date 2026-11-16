---
adr_id: ADR-ENT-003
title: "Integrated product engine of NovaPolicy instead of central product platform"
type: waiver
level: enterprise
owning_blueprint: 01-enterprise-blueprint-aurora.md
status: accepted
date: 2026-04-02
deciders: [Architecture Board]
---

# Integrated product engine of NovaPolicy instead of central product platform

## Context and problem
EP-04 v1 demands one central product platform for all LoB. NovaPolicy's value (SG-1) rests on
its integrated product designer and rating engine. Separating them would remove most of the
benefit and require heavy custom integration.

## Decision
Use NovaPolicy's integrated product engine for non-life. This is permanent, not a temporary
deviation.

## Consequences
Life products remain on their own platform. Product data for non-life must be available via
canonical APIs for reporting and distribution.

## Waiver details
| Field | Value |
|---|---|
| Principle (ADOIT ID) | EP-04 v1 |
| Required change of the principle | from "one central product platform" to "one platform per LoB group; integrated engines of standard packages allowed with canonical APIs" |
| Owner of the principle | Chief Architect |
| Deadline for principle change | 2026-06-30 |
| Result | EP-04 v2 published 2026-05-15, waiver closed |

## Rationale for the level below
The original principle aimed at consistency of product data, not at a specific platform.
Version 2 keeps that goal while allowing modern standard packages.
