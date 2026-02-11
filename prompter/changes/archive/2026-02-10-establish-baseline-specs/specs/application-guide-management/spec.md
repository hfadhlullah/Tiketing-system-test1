# Capability: Application Guide Management

## ADDED Requirements

### Requirement: Application Guide Creation

The system MUST support creation and maintenance of application user guides (Panduan Aplikasi) for software systems.

*ID: AG-001*

#### Scenario: Application guide created for system module
- WHEN a Document Controller creates an application guide
- THEN the guide includes title, application_name, version_number, user_instructions, and screenshots (optional)
- AND follows the standard document lifecycle

### Requirement: Version Alignment with Software

Application guides MUST be versioned to align with the software versions they document.

*ID: AG-002*

#### Scenario: Guide version matches application version
- WHEN an application guide is created for "DIOS v2.1"
- THEN the guide version field is set to "2.1"
- AND users can identify which software version the guide applies to

---

**Related Capabilities**:
- `sop-management` (shares document lifecycle workflow)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026
