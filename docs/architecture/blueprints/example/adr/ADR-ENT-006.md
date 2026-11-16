---
adr_id: ADR-ENT-006
title: "Malware scanning at the first point of entry; provider scanning accepted as equivalent for SaaS"
type: decision
level: enterprise
owning_blueprint: 01-enterprise-blueprint-aurora.md
status: accepted
date: 2026-11-16
deciders: [CISO (owner of STD-SEC-01), Architecture Board]
---

# Malware scanning at the first point of entry; provider scanning accepted as equivalent for SaaS

## Context and problem
Files from customers, brokers and partners reach Aurora through many channels: e-mail, APIs,
portals, file transfer and the user interfaces of SaaS systems. Only e-mail attachments are scanned
today (SYS-MGW). A file that is not scanned where it enters can spread to every system that later
processes it. For SaaS systems such as NovaPolicy, files entering through the vendor's user
interface land in the vendor's environment first, before Aurora can see them.

## Considered options
1. Each system scans the files it receives, with its own tooling.
2. Scanning at the first point of entry, and every upload into a SaaS system routed through an
   Aurora gateway first.
3. Scanning at the first point of entry under Aurora's control; for SaaS systems, scanning by the
   provider is accepted if it is contractually agreed, evidenced and checked in the outsourcing
   assessment.

## Decision
Option 3. New standard STD-SEC-01, owned by the CISO and anchored at enterprise level. Aurora
provides a central scanning service (SYS-SCAN) in DP-SEC; the EIP gateway calls it for every file
(IF-17). Option 2 was rejected because vendor user interfaces cannot be routed through an Aurora
gateway; the standard would have been broken by every SaaS system on the day it was published.

## Consequences
- Every System Blueprint lists STD-SEC-01 in chapter 2 if the system receives files from outside.
- STD-OUT-01 assessments must check the provider's malware scanning and its evidence.
- Systems that cannot comply by PL-S1 need an exception; the delegation matrix decides who
  approves it.
- Cross-domain pattern "Scan at entry" in the Enterprise Blueprint, chapter 8.

## Rationale for the level below
A file is scanned once, where it enters Aurora, so systems behind the entry point can trust it.
Teams do not build their own scanning; they receive files through the EIP gateway or call SYS-SCAN.
For SaaS systems, the provider's scanning counts if it is in the contract and proven.
