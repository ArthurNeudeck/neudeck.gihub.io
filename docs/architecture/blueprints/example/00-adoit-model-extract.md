# ADOIT model extract (stand-in)

In reality this content lives in ADOIT. All blueprints reference these IDs.

## Strategic goals
| ID | Goal |
|---|---|
| SG-1 | Time-to-market for new non-life products below 3 months |
| SG-2 | Reduce run cost of non-life policy administration by 30 % by 2030 |
| SG-3 | Straight-through quote-and-bind for at least 70 % of motor broker business |
| SG-4 | Operational resilience in line with FINMA Circular 2023/1 |
| SG-5 | Digital self-service and direct sales for private customers: 40 % of private-customer service requests self-service by 2029, motor bought online by customers without a broker (added 2026-11, ADR-ENT-004) |

## Capabilities (ACORD-inspired) with heatmap
| ID | Capability | Heat | Linked goals |
|---|---|---|---|
| CAP-01 | Product development | red | SG-1 |
| CAP-02 | Underwriting | amber | SG-3 |
| CAP-03 | Policy administration | red | SG-1, SG-2, SG-3 |
| CAP-04 | Claims management | amber | SG-2 |
| CAP-05 | Billing and collections | amber | SG-2 |
| CAP-06 | Distribution management | amber | SG-3, SG-5 |
| CAP-07 | Customer and partner management | amber (was green until SG-5) | SG-5 |

## Domains and digital products
| Domain | DP | DP Manager Business | DP Manager IT | Solution architect |
|---|---|---|---|---|
| DOM-CD Customer & Distribution | DP-BRK Broker Portal | B. Keller | M. Rossi | S. Frei |
| DOM-CD | DP-CRM Partner Management | B. Keller | M. Rossi | S. Frei |
| DOM-CD | DP-CSP Customer Self-Service (planned, SB-005) | F. Bucher | M. Rossi | S. Frei |
| DOM-PP Product & Policy | DP-PANL Policy Administration Non-Life | A. Meier | T. Brunner | L. Weber |
| DOM-PP | DP-PAL Policy Administration Life | C. Huber | T. Brunner | L. Weber |
| DOM-CL Claims | DP-CLH Claims Handling | D. Graf | P. Schmid | R. Baumann |
| DOM-FC Finance & Collections | DP-COL Collections | E. Wyss | P. Schmid | R. Baumann |
| DOM-TP Technology Platforms | DP-INT Integration Platform | – | K. Steiner | J. Moser |
| DOM-TP | DP-SEC Security Services | – | K. Steiner | J. Moser |

Domain architects: DOM-PP N. Fischer, DOM-CL and DOM-FC H. Lang, DOM-CD and DOM-TP U. Roth.
Enterprise architecture: Architecture Board, chaired by the chief architect.

## Systems
| ID | Name | Aliases | DP | Profile | Lifecycle | Hosting | PII |
|---|---|---|---|---|---|---|---|
| SYS-NOVA | NovaPolicy | Nova, new policy system, NPS | DP-PANL | buy | target | vendor SaaS (CH region) | yes |
| SYS-BEST | BEST-NL | Bestand, BEST, Bestandssystem NL | DP-PANL | make | phase-out | on-premise | yes |
| SYS-PAD | Policy Adapter Layer | PAD, adapter layer | DP-PANL | make | target | Aurora private cloud | yes |
| SYS-MIG | Migration Factory Motor | MigFab | DP-PANL | make | temporary (until PL-1 + 3 months) | Aurora private cloud | yes |
| SYS-CLM | SCHADEN-2000 | Schaden, claims system | DP-CLH | make | stable (replacement planned after 2029) | on-premise | yes |
| SYS-INK | INKA | Inkasso | DP-COL | make | stable | on-premise | yes |
| SYS-BRP | Broker Portal | Maklerportal | DP-BRK | make | target | Aurora private cloud | yes |
| SYS-PRT | Partner Master | PM, Partnersystem | DP-CRM | buy | target | on-premise | yes |
| SYS-EIP | Enterprise Integration Platform | EIP, API gateway, event broker | DP-INT | buy | target | Aurora private cloud | transit only |
| SYS-IAM | Aurora IAM | SSO | DP-SEC | buy | target | Aurora private cloud | yes |
| SYS-SIEM | Aurora SIEM | SIEM | DP-SEC | buy | target | Aurora private cloud | yes |
| SYS-ARC | Aurora Archive | Archiv | DP-INT | buy | target | Aurora private cloud | yes |
| SYS-CSP | Customer Portal | MyAurora, Kundenportal | DP-CSP | make | planned (PL-C1) | Aurora private cloud | yes |
| SYS-CIAM | Aurora Customer Identity | CIAM, customer login | DP-SEC | buy | planned (PL-C1) | vendor SaaS (CH region) | yes |

## Interfaces
| ID | From | To | Type | Business objects | Lifecycle |
|---|---|---|---|---|---|
| IF-01 | SYS-NOVA | SYS-PAD | vendor events (webhook) | BO-POL, BO-PRM | target |
| IF-02 | SYS-BEST | SYS-PAD | change data capture | BO-POL, BO-PRM | until PL-3 |
| IF-03 | SYS-PAD | SYS-EIP | canonical events `policy.nonlife.v1` | BO-POL, BO-PRM | target |
| IF-04 | SYS-PAD | SYS-CLM | legacy policy feed (BEST format, nightly file) | BO-POL | until claims replacement |
| IF-05 | SYS-PAD | SYS-INK | legacy billing instructions (BEST format) | BO-PRM | until collections modernisation |
| IF-06 | SYS-BRP | SYS-NOVA | quote-and-bind API via EIP gateway | BO-QTE, BO-POL | target |
| IF-07 | SYS-PRT | SYS-NOVA | partner data API via EIP gateway | BO-PRT | target |
| IF-08 | SYS-NOVA | SYS-SIEM | audit logs, daily batch | – | until vendor release 2028.1 |
| IF-09 | SYS-BEST | SYS-MIG | bulk extract | BO-POL, BO-PRT, BO-PRM | temporary |
| IF-10 | SYS-MIG | SYS-NOVA | bulk load via vendor migration API | BO-POL, BO-PRM | temporary |
| IF-11 | SYS-BEST | SYS-ARC | final archive export | BO-POL, BO-PRM | PL-3 only |
| IF-12 | SYS-CSP | SYS-PAD | policy query API via EIP gateway (canonical format) | BO-POL, BO-PRM | planned (PL-C1) |
| IF-13 | SYS-CSP | SYS-NOVA | quote-and-bind API via EIP gateway (same API as IF-06) | BO-QTE, BO-POL | planned (PL-C1) |
| IF-14 | SYS-CSP | SYS-PRT | customer data API via EIP gateway | BO-PRT | planned (PL-C1) |
| IF-15 | SYS-CSP | SYS-CIAM | customer login (OIDC) | BO-PRT | planned (PL-C1) |
| IF-16 | SYS-CSP | SYS-BRP | quote requests of brokered customers routed to their broker | BO-QTE | planned (PL-C1) |

## Business objects
| ID | Business object | Classification | PII | System of record |
|---|---|---|---|---|
| BO-POL | Policy | confidential | yes | SYS-BEST (all LoB) → SYS-NOVA per LoB (see ADR-ENT-002) |
| BO-PRD | Product definition | internal | no | SYS-NOVA (motor, from PL-1), SYS-BEST (others) |
| BO-PRT | Partner / customer (new attribute "broker of record", ADR-ENT-004) | confidential | yes | SYS-PRT |
| BO-PRM | Premium / billing instruction | confidential | yes | policy system of the LoB |
| BO-QTE | Quote | confidential | yes | SYS-NOVA |
| BO-CLM | Claim | strictly confidential (may contain health data) | yes | SYS-CLM |

## Principles
| ID | Level | Principle | Version |
|---|---|---|---|
| EP-01 | Enterprise | Buy before make for non-differentiating capabilities | 1 |
| EP-02 | Enterprise | Systems integrate via the Enterprise Integration Platform; no point-to-point coupling | 1 |
| EP-03 | Enterprise | Exactly one system of record per business object | 1 |
| EP-04 | Enterprise | Product definitions are maintained in one central product platform for all lines of business | 1 → 2 (ADR-ENT-003) |
| EP-05 | Enterprise | Personal data protected by design and minimised | 1 |
| EP-06 | Enterprise | Events are published in canonical, versioned formats | 1 |
| DPP-01 | Domain DOM-PP | Policy events leave the domain only in the canonical policy format (refines EP-06) | 1 |
| DPP-02 | Domain DOM-PP | Consumers outside the domain are shielded from policy system changes (refines EP-02) | 1 |

## Standards
| ID | Standard | Applies when (system attribute) |
|---|---|---|
| STD-API-01 | Synchronous APIs described in OpenAPI 3.1, exposed via EIP gateway | exposes or consumes APIs |
| STD-EVT-01 | Events described in AsyncAPI, CloudEvents envelope | publishes or consumes events |
| STD-IAM-01 | Authentication via Aurora IAM (OIDC) | has internal users |
| STD-IAM-02 | Customer authentication via Aurora CIAM (OIDC, multi-factor for bind) (new, ADR-ENT-005) | has external customer users |
| STD-LOG-01 | Security-relevant logs to SIEM within 15 minutes | any production system |
| STD-DAT-01 | PII stored and processed in Switzerland | PII = yes |
| STD-OUT-01 | FINMA outsourcing assessment and contract clauses | hosting = vendor SaaS or vendor-hosted |

## Plateaus and work packages (programme view "Core Replacement Non-Life")
| ID | Plateau | Target date | Content |
|---|---|---|---|
| PL-0 | Baseline | 2026 | All non-life LoB on SYS-BEST |
| PL-1 | Motor live | Q4 2027 | Motor on SYS-NOVA, other LoB on SYS-BEST, SYS-PAD live |
| PL-2 | All non-life live | Q4 2028 | Household and liability on SYS-NOVA, SYS-BEST read-only |
| PL-3 | Target | Q2 2029 | SYS-BEST decommissioned, data archived in SYS-ARC |

| ID | Work package | Delivers | Solution Blueprint |
|---|---|---|---|
| WP-1 | NovaPolicy setup and motor product configuration | PL-1 | SB-001 |
| WP-2 | Policy Adapter Layer | PL-1 | SB-001 |
| WP-3 | Motor migration | PL-1 | SB-001 |
| WP-4 | Household and liability migration | PL-2 | SB-002 (planned, reuses SB-001) |
| WP-5 | Decommissioning and archive | PL-3 | SB-003 (planned) |

## Plateaus and work packages (programme view "Customer Self-Service", added 2026-11)
The plateaus depend on the core replacement: policy view needs SYS-PAD (PL-1), online bind per
line of business needs that line on NovaPolicy.

| ID | Plateau | Target date | Content | Depends on |
|---|---|---|---|---|
| PL-C1 | Portal live | Q2 2028 | customers see all non-life policies; motor quote and bind online for customers without a broker | PL-1 |
| PL-C2 | Full online sales | Q2 2029 | household and liability quote and bind online | PL-2 |

| ID | Work package | Delivers | Solution Blueprint |
|---|---|---|---|
| WP-6 | Customer portal and customer identity | PL-C1 | SB-005 |
| WP-7 | Policy query API and read store in SYS-PAD | PL-C1 | SB-005 |
| WP-8 | Online bind for household and liability | PL-C2 | SB-006 (planned) |
