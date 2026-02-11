# notification-system Spec Delta

## ADDED Requirements

### Requirement: Approval Escalation Notifications

The system MUST send escalating reminders for pending approvals and escalate to supervisors if approvals are not completed within the defined timeframe.

*ID: NOTIFY-004*

**Rationale**: Per PRD error handling table and workflow requirements, approval delays risk missing compliance deadlines. Automated escalation ensures accountability and prevents approval bottlenecks.

#### Scenario: Approval reminder sent at day 3
- GIVEN a document has been in "submitted" status for 3 days
- WHEN the daily escalation job runs
- THEN an email reminder is sent to the assigned approver with subject "Reminder: Approval Pending for [Document Title]"
- AND the email includes document details, submission date, and link to approval page
- AND the notification appears in approver's in-app notification bell

#### Scenario: Approval reminders repeat at days 5 and 7
- GIVEN a document has been pending approval for 5 days (and no action taken)
- WHEN the daily escalation job runs
- THEN another reminder email is sent to the approver
- AND the email subject changes to "Urgent: Approval Overdue for [Document Title]"
- AND reminder repeats again at day 7 with escalated urgency

#### Scenario: Approval escalated to supervisor at day 10
- GIVEN a document has been pending approval for 10 days with no action
- WHEN the escalation job runs
- THEN an escalation email is sent to the approver's department head/supervisor
- AND email subject is "Escalation: Approval Overdue 10 Days for [Document Title]"
- AND email includes original approver name, document details, and approval link
- AND the escalation event is logged in audit trail
- AND the document appears in department head's "Escalated Approvals" dashboard

#### Scenario: Escalation cancelled when approval completed
- GIVEN a document has pending reminders scheduled for days 5, 7, and escalation at day 10
- WHEN the approver approves the document on day 4
- THEN all future reminders and escalation notifications are cancelled
- AND no further emails are sent

**Escalation Schedule**:
- **Day 3**: First reminder to approver (normal priority)
- **Day 5**: Second reminder to approver (high priority)
- **Day 7**: Third reminder to approver (urgent)
- **Day 10**: Escalation to approver's supervisor/department head
- **Day 14**: Optional: Escalation to quality manager (configurable)

**Configuration Options** (for future):
- Escalation schedule can be customized per document type or department
- Escalation can be disabled for specific approvers (e.g., executives)
- Working days vs calendar days option

---

**Related PRD Stories**:
- US-11 (approval workflow - mentions urgency and due dates)
- PRD Error Handling Table (approval timeout handling)

**Related Capabilities**:
- `sop-management` (and other document management capabilities using approval workflow)
- `audit-logging` (escalation events logged)

**Open Questions** (from PRD):
- **OQ-05**: Exact escalation policy - this spec proposes 3/5/7/10 day schedule; requires stakeholder confirmation
- Should escalation skip levels (e.g., approver → quality manager) or go hierarchically (approver → dept head → quality manager)?
