# work-instruction-management Specification

## Purpose
TBD - created by archiving change establish-baseline-specs. Update Purpose after archive.
## Requirements
### Requirement: Work Instruction Creation

The system MUST allow creation of work instructions (Instruksi Kerja) with detailed procedure steps and responsible party assignments.

*ID: WI-001*

#### Scenario: Work instruction created with procedure steps
- WHEN a Document Controller creates a work instruction
- THEN the instruction includes title, description, procedure_steps (JSON or structured text), responsible_party, and related_forms
- AND follows the same document lifecycle as SOPs

### Requirement: Responsible Party Assignment

Work instructions MUST specify who is responsible for executing each instruction.

*ID: WI-002*

#### Scenario: Responsible party assigned to work instruction
- WHEN creating or editing a work instruction
- THEN the user can assign a responsible_party (user or role)
- AND the responsible party is notified when the instruction is published

### Requirement: Related Forms Linkage

Work instructions MUST  support linking to related forms and documents.

*ID: WI-003*

#### Scenario: Work instruction linked to forms
- WHEN a work instruction requires a specific form (e.g., "Safety Checklist Form")
- THEN the user can link the form document to the work instruction
- AND users viewing the instruction can access linked forms

---

**Related Capabilities**:
- `sop-management` (shares document lifecycle workflow)
- `form-management` (linked forms)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026

