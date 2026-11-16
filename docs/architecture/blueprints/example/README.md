# Aurora Versicherung AG – End-to-end example

Fictional mid-sized Swiss insurer. Scenario: replacement of the in-house policy administration
system for non-life (BEST-NL) by the standard package NovaPolicy (fictional vendor NovaSoft),
migrated line of business by line of business. Claims and Collections stay on their legacy
systems for now and are connected via the Policy Adapter Layer.

## Files

| File | Level / type | Profile |
|---|---|---|
| `00-adoit-model-extract.md` | stand-in for the ADOIT model | – |
| `01-enterprise-blueprint-aurora.md` | Enterprise | enterprise |
| `02-domain-blueprint-product-policy.md` | Domain Product & Policy | domain |
| `03-dp-blueprint-policy-admin-nonlife.md` | DP Policy Administration Non-Life | dp |
| `04-system-blueprint-novapolicy.md` | System NovaPolicy | buy |
| `05-system-blueprint-policy-adapter-layer.md` | System Policy Adapter Layer | make |
| `06-solution-blueprint-p1-motor-migration.md` | Initiative, plateau 1 | solution-full |
| `07-solution-blueprint-novapolicy-siem-logging.md` | Deviation | solution-light |
| `adr/` | decisions, exceptions, waiver | – |
| `FINDINGS.md` | gaps and errors in the method found while writing the example | – |

## Reading paths

- **Board / executive:** 01 chapters 1, 4, 13.
- **Domain architect:** 02, then the ADRs at enterprise and domain level.
- **DP managers:** 03, chapters 1, 5, 11, 13.
- **Teams and vendor:** 04, 05, 06.

Diagrams are ADOIT views (`<!-- adoit-view: ... -->`). For this example, every view has a Mermaid
stand-in directly below its marker, drawn in ArchiMate colours (yellow business, blue application,
green technology, grey legacy, thick border for elements new with a change, dashed for temporary
elements; red, amber and green only for the capability heatmap). Each diagram on the website has a
legend underneath.
