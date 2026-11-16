---
blueprint: system
profile: buy
title: "System Blueprint NovaPolicy"
adoit_id: SYS-NOVA
parent_adoit_id: DP-PANL
domain: DOM-PP
digital_product: DP-PANL
vendor: "NovaSoft (fictional)"
product_version: "2027.2"
status: in-review
version: 0.9
accountable: "T. Brunner, DP Manager IT"
responsible: "lead engineer PANL"
reviewer: "L. Weber, solution architect DP-PANL"
last_reviewed: 2026-11-16
---

# System Blueprint – NovaPolicy (Buy)

## 1 Introduction and goals
### 1.1 Purpose and scope of use
Policy administration, product definition, rating and quote-and-bind for non-life. In use for
motor from PL-1, for household and liability from PL-2. Billing remains in INKA; NovaPolicy
billing module is licensed but not used.

### 1.2 Quality goals
1. Configurability: new tariff variant without vendor release.
2. Availability 99.5 % in business hours.
3. Upgradeability: two vendor releases per year without custom-code rework.

### 1.3 Stakeholders
Policy operations, product management, NovaSoft (vendor), EIP team, CISO.

## 2 Constraints (inherited)
| ADOIT ID | Principle / standard | Applies because | Fulfilled |
|---|---|---|---|
| EP-04 v2 | product engine of standard package allowed | product definition in NovaPolicy | yes |
| STD-API-01 | OpenAPI via EIP | exposes APIs (IF-06, IF-07) | yes |
| STD-EVT-01 | AsyncAPI, CloudEvents | publishes events (IF-01) | partly: vendor format, mapped by SYS-PAD (ADR-DOM-001) |
| STD-IAM-01 | OIDC via Aurora IAM | has users | yes |
| STD-LOG-01 | SIEM within 15 min | production system | no → ADR-SYS-NOVA-002 (exception) |
| STD-DAT-01 | PII in Switzerland | PII = yes | yes, CH region (ADR-SYS-NOVA-001) |
| STD-OUT-01 | FINMA outsourcing | hosting = vendor SaaS | yes, assessment OA-2026-07 |
| STD-SEC-01 | malware scanning at entry | receives files from outside (broker documents) | yes: files via IF-06 scanned at the EIP gateway; uploads in the vendor user interface scanned by NovaSoft (equivalent control, contract annex, evidence checked in OA-2026-07) |

## 3 Context
<!-- adoit-view: SYS-NOVA-CONTEXT -->

```mermaid
flowchart LR
  NOVA["SYS-NOVA NovaPolicy"]:::app
  BRP["SYS-BRP Broker Portal"]:::ext
  PRT["SYS-PRT Partner Master"]:::ext
  PAD["SYS-PAD Policy Adapter Layer"]:::ext
  SIEM["SYS-SIEM Aurora SIEM"]:::ext
  MIG["SYS-MIG Migration Factory"]:::temp
  BRP -->|"IF-06 quote and bind (REST via EIP)"| NOVA
  PRT -->|"IF-07 partner data (REST via EIP)"| NOVA
  NOVA -->|"IF-01 policy events (webhook)"| PAD
  NOVA -->|"IF-08 audit logs (daily file)"| SIEM
  MIG -.->|"IF-10 migration load (temporary)"| NOVA
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
| Policy events | IF-01 | SYS-PAD | out | webhook (vendor format) | BO-POL, BO-PRM |
| Quote and bind | IF-06 | SYS-BRP | in | REST via EIP gateway | BO-QTE, BO-POL |
| Partner data | IF-07 | SYS-PRT | in | REST via EIP gateway | BO-PRT |
| Audit logs | IF-08 | SYS-SIEM | out | daily file | – |
| Migration load | IF-10 | SYS-MIG | in | vendor migration API | BO-POL, BO-PRM (temporary) |

## 5 Building blocks: modules, configuration, extensions
The vendor's internals are a black box; the view shows what Aurora licenses, configures and extends.

<!-- adoit-view: SYS-NOVA-BUILDING-BLOCKS -->

```mermaid
flowchart LR
  subgraph NOVA["SYS-NOVA NovaPolicy (vendor SaaS)"]
    PD["Product designer"]:::app
    RE["Rating engine"]:::app
    PA["Policy administration"]:::app
    BAPI["Broker API"]:::app
    BILL["Billing module<br/>licensed, not used"]:::unused
    CFG1["Motor product family<br/>3 products, 14 covers"]:::cfg
    CFG2["Underwriting rules,<br/>renewal workflow"]:::cfg
    EXT1["Swiss vehicle data lookup<br/>(Aurora plug-in)"]:::own
    EXT2["Broker commission rules<br/>(Aurora rules extension)"]:::own
  end
  PD --> CFG1
  RE --> CFG1
  PA --> CFG2
  RE --> EXT1
  PA --> EXT2
  BAPI --> RE
  BAPI --> PA
  IF06(["IF-06, IF-13"]):::ext --> BAPI
  PA --> IF01(["IF-01"]):::ext
  classDef app fill:#b5ffff,stroke:#2a7f8f,color:#000
  classDef biz fill:#ffffb5,stroke:#a89a2b,color:#000
  classDef tech fill:#c9e7b7,stroke:#4b7f3a,color:#000
  classDef ext fill:#eeeeee,stroke:#888,color:#000
  classDef temp fill:#ffffff,stroke:#888,stroke-dasharray:5 5,color:#000
  classDef legacy fill:#dddddd,stroke:#777,color:#444
  classDef new fill:#b5ffff,stroke:#1d6fa5,stroke-width:3px,color:#000
  classDef own fill:#b5ffff,stroke:#7a3fb0,stroke-width:3px,color:#000
  classDef cfg fill:#f3fbe9,stroke:#4b7f3a,color:#000
  classDef unused fill:#f4f4f4,stroke:#aaaaaa,color:#888
```


### 5.1 Licensed modules in use
Product designer, rating engine, policy administration, broker API. Not used: billing.

### 5.2 Configuration
Motor product family (3 products, 14 cover options), underwriting rules, renewal workflow.
Configuration is versioned in the vendor's configuration repository and exported to Git weekly.

### 5.3 Extension points and custom code
| Extension | Mechanism | Owner | Upgrade risk |
|---|---|---|---|
| Swiss vehicle data lookup | vendor plug-in API | PANL team | low |
| Broker commission rules | rules extension | PANL team | medium |

## 6 Runtime
Key scenario quote-and-bind: broker portal calls IF-06 via EIP gateway, NovaPolicy rates,
binds the policy, emits event on IF-01, SYS-PAD publishes canonical event and adds the policy
to the nightly claims feed.

<!-- adoit-view: SYS-NOVA-RUNTIME-QUOTE -->

```mermaid
sequenceDiagram
  participant BRP as Broker Portal
  participant GW as EIP gateway
  participant NOVA as NovaPolicy
  participant PAD as Policy Adapter Layer
  participant EIP as EIP event broker
  BRP->>GW: IF-06 quote request
  GW->>NOVA: forward (authenticated)
  NOVA-->>BRP: rated quote
  BRP->>GW: IF-06 bind
  GW->>NOVA: forward
  NOVA-->>BRP: policy number
  NOVA->>PAD: IF-01 policy event (vendor format)
  PAD->>EIP: IF-03 canonical event policy.nonlife.v1
  Note over PAD: policy added to nightly claims feed IF-04
```

Scenario "product manager changes a motor tariff":

<!-- adoit-view: SYS-NOVA-RUNTIME-TARIFF -->

```mermaid
sequenceDiagram
  participant PM as Product manager
  participant T1 as Test tenant
  participant GIT as Aurora Git (configuration export)
  participant PRE as Pre-production tenant
  participant PROD as Production tenant
  PM->>T1: change tariff in product designer
  PM->>T1: test with reference policies
  T1->>GIT: weekly configuration export (versioned)
  PM->>PRE: promote configuration
  Note over PRE: regression of quote-and-bind, 2 days
  PRE->>PROD: promote, effective next Monday
  Note over PM,PROD: target: in production within 10 working days
```


## 7 Deployment
<!-- adoit-view: SYS-NOVA-DEPLOYMENT -->

```mermaid
flowchart LR
  subgraph SAAS["NovaSoft SaaS, Swiss region"]
    PROD["Production tenant"]:::tech
    PRE["Pre-production tenant"]:::tech
    T1["Test tenant 1"]:::tech
    T2["Test tenant 2"]:::tech
  end
  subgraph AUR["Aurora private cloud"]
    GW["EIP gateway"]:::tech
    PAD["Policy Adapter Layer"]:::app
  end
  REL(["Vendor release<br/>twice a year"]):::ext
  REL --> T1 --> PRE
  REL --> T2
  PRE -->|"after 4-week regression"| PROD
  GW <--> PROD
  PROD --> PAD
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

Vendor-managed SaaS, Swiss region, environments: production, pre-production, two test
tenants. Vendor releases twice a year; Aurora regression test window 4 weeks.

## 9 Decisions
| ADR | Title | Type | Status | Date |
|---|---|---|---|---|
| ADR-SYS-NOVA-001 | Vendor SaaS in Swiss region instead of on-premise installation | decision | accepted | 2026-04-15 |
| ADR-SYS-NOVA-002 | Daily audit log delivery to SIEM until vendor release 2028.1 | exception | accepted | 2026-11-04 |

## 10 Quality requirements
| Scenario | Target |
|---|---|
| Tariff change by product manager | in production within 10 working days |
| Vendor upgrade | no custom-code change in 80 % of releases |

## 11 Risks, technical debt, exceptions
| ID | Type | Description | Owner | Expiry / target date | Ticket |
|---|---|---|---|---|---|
| EXC-PANL-001 | exception | daily SIEM logging | T. Brunner | 2028-06-30 | TD-PANL-004 |
| R-NOVA-01 | risk | vendor lock-in for product configuration | A. Meier | – | – |

## 13 Roadmap and transition
| Plateau | Change for this system |
|---|---|
| PL-1 | motor configured and live |
| PL-2 | household and liability configured and live |
| 2028.1 | vendor release with streaming audit logs, exception EXC-PANL-001 closed |
