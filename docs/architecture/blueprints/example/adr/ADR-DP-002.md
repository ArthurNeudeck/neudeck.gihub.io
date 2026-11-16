---
adr_id: ADR-DP-002
title: "Migration by line of business, motor first"
type: decision
level: dp
owning_blueprint: 03-dp-blueprint-policy-admin-nonlife.md
status: accepted
date: 2026-02-10
deciders: [A. Meier, T. Brunner, L. Weber]
---

# Migration by line of business, motor first

## Context and problem
Big bang is excluded by the enterprise strategy. Order of LoB to be decided.

## Decision
Motor first (highest volume, strongest broker pressure, SG-3), then household and liability.

## Consequences
Dual system of record for about 12 months per remaining LoB (ADR-ENT-002).
