---
adr_id: ADR-ENT-005
title: "Customer identity as a central platform service (CIAM)"
type: decision
level: enterprise
owning_blueprint: 01-enterprise-blueprint-aurora.md
status: accepted
date: 2026-11-16
deciders: [Architecture Board, CISO (owner of STD-IAM-01 and STD-IAM-02)]
---

# Customer identity as a central platform service (CIAM)

## Context and problem
The customer portal is the first application with external customer logins. STD-IAM-01 and Aurora
IAM are designed for employees and brokers. Further customer-facing applications are likely
(claims reporting, mobile app).

## Considered options
1. Extend Aurora IAM (workforce) to customers.
2. Customer login built into the portal.
3. A dedicated customer identity platform (CIAM) in DP-SEC, offered to all customer applications.

## Decision
Option 3, as vendor SaaS in a Swiss region (SYS-CIAM). New standard STD-IAM-02: customer
authentication via Aurora CIAM, multi-factor authentication for every bind.

## Consequences
- Customer identities with PII are held in one place, not per application.
- STD-OUT-01 applies (vendor SaaS): outsourcing assessment required before PL-C1.
- Using CIAM through its standard offering is not a cross-DP change for later applications
  (see FINDINGS F3).

## Rationale for the level below
Teams building customer applications do not build their own login. They connect to CIAM and
follow STD-IAM-02.
