---
adr_id: ADR-DOM-001
title: "Canonical policy event format policy.nonlife.v1 aligned to ACORD"
type: decision
level: domain
owning_blueprint: 02-domain-blueprint-product-policy.md
status: accepted
date: 2026-05-20
deciders: [N. Fischer, solution architects DP-PANL and DP-PAL]
---

# Canonical policy event format policy.nonlife.v1

## Context and problem
Two policy systems in parallel, later possibly a life system: consumers need one format.

## Considered options
1. Publish NovaPolicy's vendor format.
2. Own canonical format, aligned to the ACORD information model.

## Decision
Option 2, maintained in the EIP schema registry, owned by DOM-PP.

## Consequences
SYS-PAD maps every source; vendor upgrades don't affect consumers. Mapping effort per source.
Domain-level decision because it spans DP-PANL and, prospectively, DP-PAL.
