# Capability: Quality Manual Management

## ADDED Requirements

### Requirement: Quality Manual Documentation

The system MUST support comprehensive documentation of the organization's Quality Management System (QMS) in the Quality Manual (Manual Mutu).

*ID: QM-001*

#### Scenario: Quality manual section created
- WHEN a Quality Manager creates or edits the quality manual
- THEN the manual includes sections for QMS scope, quality policy, organizational structure, process descriptions, and responsibilities
- AND follows the standard document lifecycle

### Requirement: QMS Scope Definition

The quality manual MUST clearly define the scope of the Quality Management System including processes, exclusions, and boundaries.

*ID: QM-002*

#### Scenario: QMS scope documented
- WHEN the quality manual is created or updated
- THEN the QMS scope section specifies: applicable processes, organizational units covered, products/services in scope, and any justified exclusions
- AND changes to scope require Quality Manager approval

---

**Related Capabilities**:
- `sop-management` (references SOPs for process details)
- `policy-management` (includes quality policy)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026
