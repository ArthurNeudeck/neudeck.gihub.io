---
blueprint: system
profile: buy
title: "System Blueprint <System>"
adoit_id: ""
parent_adoit_id: ""          # DP
domain: ""
digital_product: ""
vendor: ""
product_version: ""
status: draft
version: 0.1
accountable: ""
responsible: ""
reviewer: ""
last_reviewed: YYYY-MM-DD
---

# System Blueprint – <System> (Buy)

## 1 Introduction and goals
### 1.1 Purpose and scope of use
### 1.2 Quality goals
### 1.3 Stakeholders (incl. vendor)

## 2 Constraints (inherited)
<!-- Relevant standards derived from system attributes; exclusions require an ADR. -->
| ADOIT ID | Principle / standard | Applies because | Fulfilled (yes / partly / no + ADR) |
|---|---|---|---|

## 3 Context
<!-- adoit-view: SYSTEM-CONTEXT-ID -->
| Interface | ADOIT ID | Partner system | Direction | Technology | Business objects |
|---|---|---|---|---|---|

## 4 Solution strategy (optional)

## 5 Building blocks: modules, configuration, extensions
<!-- adoit-view: SYSTEM-BUILDING-BLOCKS-ID -->
<!-- The vendor's internal structure is a black box. The view shows what Aurora owns: licensed
     modules in use (and licensed but unused), configuration objects, Aurora's extensions, and the
     interfaces they serve. -->
### 5.1 Licensed modules in use
### 5.2 Configuration (product definition, rules, workflows)
### 5.3 Extension points and custom code
| Extension | Mechanism | Owner | Upgrade risk |
|---|---|---|---|

## 6 Runtime
<!-- adoit-view: RUNTIME-<SCENARIO>-ID -->
<!-- One view per key scenario (UML sequence diagram allowed as exception): the main business
     scenario, one error or fallback case, and every scenario named in the quality goals. -->
<!-- For Buy systems also: how a configuration change reaches production. -->

## 7 Deployment
<!-- adoit-view: SYSTEM-DEPLOYMENT-ID -->
<!-- Hosting model (SaaS / vendor-hosted / own), environments, release and upgrade cycle. -->

## 8 Cross-cutting concepts (optional)

## 9 Decisions
| ADR | Title | Type | Status | Date |
|---|---|---|---|---|

## 10 Quality requirements

## 11 Risks, technical debt, exceptions
<!-- Include vendor lock-in and upgrade risks. -->

## 12 Glossary (optional)
## 13 Roadmap and transition (optional)
