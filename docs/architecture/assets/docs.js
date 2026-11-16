/* Markdown documents of the Architecture Blueprint pages, in reading order. */
(function () {
  'use strict';

  window.AB_DOCS = [
    { group: 'Templates', path: 'templates/README.md', title: 'Template set: rules and chapter matrix' },
    { group: 'Templates', path: 'templates/enterprise-blueprint.md', title: 'Enterprise Blueprint' },
    { group: 'Templates', path: 'templates/domain-blueprint.md', title: 'Domain Blueprint' },
    { group: 'Templates', path: 'templates/dp-blueprint.md', title: 'Digital Product Blueprint' },
    { group: 'Templates', path: 'templates/system-blueprint-buy.md', title: 'System Blueprint (Buy)' },
    { group: 'Templates', path: 'templates/system-blueprint-make.md', title: 'System Blueprint (Make)' },
    { group: 'Templates', path: 'templates/solution-blueprint.md', title: 'Solution Blueprint (full / light)' },
    { group: 'Templates', path: 'templates/adr-template.md', title: 'Architecture Decision Record' },
    { group: 'Example', path: 'example/README.md', title: 'Aurora: overview and reading paths' },
    { group: 'Example', path: 'example/00-adoit-model-extract.md', title: '00 Model extract (repository stand-in)' },
    { group: 'Example', path: 'example/01-enterprise-blueprint-aurora.md', title: '01 Enterprise Blueprint' },
    { group: 'Example', path: 'example/02-domain-blueprint-product-policy.md', title: '02 Domain Blueprint Product & Policy' },
    { group: 'Example', path: 'example/03-dp-blueprint-policy-admin-nonlife.md', title: '03 DP Blueprint Policy Admin Non-Life' },
    { group: 'Example', path: 'example/04-system-blueprint-novapolicy.md', title: '04 System Blueprint NovaPolicy (Buy)' },
    { group: 'Example', path: 'example/05-system-blueprint-policy-adapter-layer.md', title: '05 System Blueprint Policy Adapter Layer (Make)' },
    { group: 'Example', path: 'example/06-solution-blueprint-p1-motor-migration.md', title: '06 Solution Blueprint SB-001 (full)' },
    { group: 'Example', path: 'example/07-solution-blueprint-novapolicy-siem-logging.md', title: '07 Solution Blueprint SB-004 (light)' },
    { group: 'Example', path: 'example/08-solution-blueprint-customer-portal.md', title: '08 Solution Blueprint SB-005 (enhancement: customer portal)' },
    { group: 'Example', path: 'example/FINDINGS.md', title: 'Findings: open issues of the method' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-ENT-001.md', title: 'ADR-ENT-001 Claims and collections fed by policy domain' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-ENT-002.md', title: 'ADR-ENT-002 Two systems of record (exception)' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-ENT-003.md', title: 'ADR-ENT-003 Integrated product engine (waiver)' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-ENT-004.md', title: 'ADR-ENT-004 Direct digital channel (enhancement)' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-ENT-005.md', title: 'ADR-ENT-005 Customer identity platform (enhancement)' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-DOM-001.md', title: 'ADR-DOM-001 Canonical policy event format' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-DOM-002.md', title: 'ADR-DOM-002 Policy query API (enhancement)' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-DP-001.md', title: 'ADR-DP-001 Replace BEST-NL with NovaPolicy' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-DP-002.md', title: 'ADR-DP-002 Migration by line of business' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-SYS-NOVA-001.md', title: 'ADR-SYS-NOVA-001 Vendor SaaS in Swiss region' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-SYS-NOVA-002.md', title: 'ADR-SYS-NOVA-002 Daily audit logs (exception)' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-SOL-001-01.md', title: 'ADR-SOL-001-01 Active migration at cutover' },
    { group: 'Decisions (ADRs)', path: 'example/adr/ADR-SOL-005-01.md', title: 'ADR-SOL-005-01 Customer portal as own development (enhancement)' }
  ];
})();
