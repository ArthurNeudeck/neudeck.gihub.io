---
blueprint: system
profile: make
title: "System Blueprint Policy Adapter Layer"
adoit_id: SYS-PAD
parent_adoit_id: DP-PANL
domain: DOM-PP
digital_product: DP-PANL
status: approved
version: 1.1
accountable: "T. Brunner, DP Manager IT"
responsible: "lead engineer PAD"
reviewer: "L. Weber, solution architect DP-PANL"
last_reviewed: 2026-10-28
---

# System Blueprint – Policy Adapter Layer (Make)

## 1 Introduction and goals
### 1.1 Requirements overview
- Translate policy data from NovaPolicy and BEST-NL into the canonical format `policy.nonlife.v1`.
- Route by LoB to the current system of record.
- Generate legacy-format feeds for SCHADEN-2000 (IF-04) and INKA (IF-05) from both sources.

### 1.2 Quality goals
1. Correctness: reconciliation differences 0 after each cutover.
2. Replaceability: a source system can be switched per LoB by configuration.
3. Observability: every message traceable end to end.

### 1.3 Stakeholders
PANL team, claims and collections IT (consumers), EIP team.

## 2 Constraints (inherited)
| ADOIT ID | Principle / standard | Applies because | Fulfilled |
|---|---|---|---|
| EP-02 | integration via EIP | integrates systems | yes, IF-03 on EIP |
| DPP-01 | canonical policy format | publishes policy events | yes |
| DPP-02 | shielded consumers | feeds claims and collections | yes, legacy formats |
| STD-EVT-01 | AsyncAPI, CloudEvents | publishes events | yes |
| STD-LOG-01 | SIEM within 15 min | production system | yes |
| STD-DAT-01 | PII in Switzerland | PII = yes | yes |
| EP-02 (IF-04, IF-05 as files) | no point-to-point | legacy feeds are direct file transfers | partly → TD-PANL-002, covered by ADR-ENT-001 |

## 3 Context
<!-- adoit-view: SYS-PAD-CONTEXT -->

```mermaid
flowchart LR
  NOVA["SYS-NOVA NovaPolicy"]:::ext
  BEST["SYS-BEST BEST-NL"]:::legacy
  PAD["SYS-PAD Policy Adapter Layer"]:::app
  EIP["SYS-EIP Integration Platform"]:::tech
  CLM["SYS-CLM SCHADEN-2000"]:::ext
  INK["SYS-INK INKA"]:::ext
  NOVA -->|"IF-01 webhook"| PAD
  BEST -->|"IF-02 CDC"| PAD
  PAD -->|"IF-03 canonical events"| EIP
  PAD -->|"IF-04 nightly policy file"| CLM
  PAD -->|"IF-05 nightly billing file"| INK
  classDef app fill:#b5ffff,stroke:#2a7f8f,color:#000
  classDef biz fill:#ffffb5,stroke:#a89a2b,color:#000
  classDef tech fill:#c9e7b7,stroke:#4b7f3a,color:#000
  classDef ext fill:#eeeeee,stroke:#888,color:#000
  classDef red fill:#f5a3a3,stroke:#b03030,color:#000
  classDef amber fill:#ffd591,stroke:#c98a00,color:#000
  classDef green fill:#b7e4b0,stroke:#3c8a32,color:#000
  classDef temp fill:#ffffff,stroke:#888,stroke-dasharray:5 5,color:#000
  classDef legacy fill:#dddddd,stroke:#777,color:#444
  classDef new fill:#b5ffff,stroke:#1d6fa5,stroke-width:3px,color:#000
```

| Interface | ADOIT ID | Partner system | Direction | Technology | Business objects |
|---|---|---|---|---|---|
| Policy events | IF-01 | SYS-NOVA | in | webhook | BO-POL, BO-PRM |
| Change data | IF-02 | SYS-BEST | in | CDC | BO-POL, BO-PRM |
| Canonical events | IF-03 | SYS-EIP | out | event broker | BO-POL, BO-PRM |
| Policy feed | IF-04 | SYS-CLM | out | nightly file | BO-POL |
| Billing instructions | IF-05 | SYS-INK | out | nightly file | BO-PRM |

## 4 Solution strategy
Event-driven adapters per source, a canonical mapping core and per-consumer output adapters.
Java services on Aurora private cloud, schemas in the EIP schema registry.

## 5 Building blocks
<!-- adoit-view: SYS-PAD-COMPONENTS -->

```mermaid
flowchart LR
  subgraph PAD["SYS-PAD Policy Adapter Layer"]
    NIN["Nova inbound adapter"]:::app
    BIN["BEST inbound adapter"]:::app
    RT["LoB router<br/>(config table)"]:::app
    MAP["Canonical mapper"]:::app
    PUB["Event publisher"]:::app
    LEG["Legacy feed generator"]:::app
  end
  IF01(["IF-01"]):::ext --> NIN
  IF02(["IF-02"]):::ext --> BIN
  NIN --> RT
  BIN --> RT
  RT --> MAP
  MAP --> PUB
  MAP --> LEG
  PUB --> IF03(["IF-03"]):::ext
  LEG --> IF04(["IF-04"]):::ext
  LEG --> IF05(["IF-05"]):::ext
  classDef app fill:#b5ffff,stroke:#2a7f8f,color:#000
  classDef biz fill:#ffffb5,stroke:#a89a2b,color:#000
  classDef tech fill:#c9e7b7,stroke:#4b7f3a,color:#000
  classDef ext fill:#eeeeee,stroke:#888,color:#000
  classDef red fill:#f5a3a3,stroke:#b03030,color:#000
  classDef amber fill:#ffd591,stroke:#c98a00,color:#000
  classDef green fill:#b7e4b0,stroke:#3c8a32,color:#000
  classDef temp fill:#ffffff,stroke:#888,stroke-dasharray:5 5,color:#000
  classDef legacy fill:#dddddd,stroke:#777,color:#444
  classDef new fill:#b5ffff,stroke:#1d6fa5,stroke-width:3px,color:#000
```

| Component | Responsibility |
|---|---|
| Nova inbound adapter | receives IF-01, validates vendor events |
| BEST inbound adapter | consumes IF-02 CDC stream |
| LoB router | decides system of record per LoB (config table) |
| Canonical mapper | maps to `policy.nonlife.v1` |
| Event publisher | publishes IF-03 |
| Legacy feed generator | builds IF-04 and IF-05 files from canonical data |

## 6 Runtime
Scenario "policy change for a migrated motor policy": NovaPolicy emits event → Nova inbound
adapter → LoB router confirms NovaPolicy is SoR for motor → canonical mapper → event published
→ legacy feed generator adds record to nightly IF-04 and IF-05 files.
(UML sequence diagram allowed here as exception, maintained in ADOIT.)

<!-- adoit-view: SYS-PAD-RUNTIME-CHANGE -->

```mermaid
sequenceDiagram
  participant NOVA as NovaPolicy
  participant NIN as Nova inbound adapter
  participant RT as LoB router
  participant MAP as Canonical mapper
  participant PUB as Event publisher
  participant LEG as Legacy feed generator
  NOVA->>NIN: IF-01 policy changed (motor)
  NIN->>RT: validated event
  RT->>RT: motor: system of record = NovaPolicy
  RT->>MAP: accepted
  MAP->>PUB: policy.nonlife.v1
  PUB-->>PUB: IF-03 publish on EIP
  MAP->>LEG: canonical record
  Note over LEG: added to nightly IF-04 and IF-05 files
```

Scenario "cutover switch of a line of business" (PL-1, motor):

<!-- adoit-view: SYS-PAD-RUNTIME-SWITCH -->

```mermaid
sequenceDiagram
  participant OPS as Cutover team
  participant RT as LoB router (config table)
  participant BIN as BEST inbound adapter
  participant NIN as Nova inbound adapter
  participant DLQ as Dead-letter queue
  OPS->>RT: Sunday after go: set motor = NovaPolicy
  RT-->>OPS: configuration active, no deployment
  NIN->>RT: motor event from NovaPolicy
  RT-->>NIN: accepted
  BIN->>RT: late motor event from BEST-NL
  RT->>DLQ: rejected, wrong system of record
  DLQ-->>OPS: alert, reconciliation checks the record
  Note over OPS,RT: rollback until Sunday 18:00 = set motor = BEST-NL
```


## 7 Deployment
<!-- adoit-view: SYS-PAD-DEPLOYMENT -->

```mermaid
flowchart LR
  subgraph K8S["Kubernetes, Aurora private cloud"]
    subgraph Z1["Zone 1"]
      P1["PAD production pods"]:::app
    end
    subgraph Z2["Zone 2"]
      P2["PAD production pods"]:::app
    end
    TST["PAD test namespace"]:::app
  end
  REG["EIP schema registry"]:::tech
  DLQ["Dead-letter queue<br/>with alerting"]:::tech
  P1 --- REG
  P2 --- REG
  P1 --> DLQ
  P2 --> DLQ
  classDef app fill:#b5ffff,stroke:#2a7f8f,color:#000
  classDef biz fill:#ffffb5,stroke:#a89a2b,color:#000
  classDef tech fill:#c9e7b7,stroke:#4b7f3a,color:#000
  classDef ext fill:#eeeeee,stroke:#888,color:#000
  classDef red fill:#f5a3a3,stroke:#b03030,color:#000
  classDef amber fill:#ffd591,stroke:#c98a00,color:#000
  classDef green fill:#b7e4b0,stroke:#3c8a32,color:#000
  classDef temp fill:#ffffff,stroke:#888,stroke-dasharray:5 5,color:#000
  classDef legacy fill:#dddddd,stroke:#777,color:#444
  classDef new fill:#b5ffff,stroke:#1d6fa5,stroke-width:3px,color:#000
```

Kubernetes on Aurora private cloud, two zones, production and test.

## 8 Cross-cutting concepts
Idempotent processing, correlation ID per policy version, dead-letter queue with alerting.

## 9 Decisions
| ADR | Title | Type | Status | Date |
|---|---|---|---|---|
| ADR-SYS-PAD-001 | LoB routing by configuration table, not by code | decision | accepted | 2026-06-03 |

## 10 Quality requirements
| Scenario | Target |
|---|---|
| Canonical event latency | below 1 minute |
| Cutover switch of a LoB | configuration change, no deployment |

## 11 Risks, technical debt, exceptions
| ID | Type | Description | Owner | Expiry / target date | Ticket |
|---|---|---|---|---|---|
| TD-PANL-002 | technical debt | legacy file feeds IF-04, IF-05 | T. Brunner | claims / collections modernisation | TD-PANL-002 |
