# Stories: Implementation Tasks

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Project**            | Difan-DIOS (Difan Integrated Operational System) |
| **Version**            | 1.0.0 (DRAFT - TEMPLATE)       |
| **Date**               | February 10, 2026              |
| **Status**             | 🟡 Template - Awaiting Content |
| **Author**             | TBD                            |
| **Reviewers**          | Tech Lead, Scrum Master        |
| **Dependencies**       | FSD, ERD, API Contract, UI Wireframes, TDD-Lite, Epics complete |

---

## 1. Introduction

### 1.1 Purpose
This document breaks down each epic from `epics.md` into detailed, actionable implementation stories. Each story represents a discrete unit of work that can be assigned to a developer, estimated, implemented, tested, and demo'd within a sprint.

### 1.2 Scope
- Covers all 15 epics with 100+ implementation stories
- Each story includes: description, acceptance criteria, testing requirements, effort estimate, dependencies
- Stories organized by epic for easy sprint planning

### 1.3 Story Format

Each story follows this template:

```
### STORY-XXX: [Story Title]

**Epic**: EPIC-XX  
**Priority**: P0 (Must Have) | P1 (Should Have) | P2 (Could Have) | P3 (Won't Have)  
**Story Points**: [TBD - X points]  
**Assigned To**: [TBD]  

**User Story** (if applicable):  
As a [role], I want to [action], so that [benefit].

**Technical Story** (if no user story):  
Implement [technical component] to enable [capability].

**Acceptance Criteria** (Given/When/Then format):
- **GIVEN** [precondition]  
  **WHEN** [action]  
  **THEN** [expected outcome]
- **GIVEN** ...  
  **WHEN** ...  
  **THEN** ...

**Implementation Details**:
- [List technical tasks, file changes, new components, etc.]

**Testing Requirements**:
- Unit tests: [describe what to test]
- Integration tests: [describe API/component integration tests]
- E2E tests: [describe end-to-end user flows]

**Definition of Done**:
- [ ] Code implemented and passes linting
- [ ] Unit tests written and passing (coverage >= 80%)
- [ ] Integration tests written and passing
- [ ] Peer code review completed
- [ ] Documentation updated (API docs, component docs)
- [ ] Deployed to dev/staging environment
- [ ] QA tested and approved
- [ ] Product Owner accepted story

**Dependencies**:
- **Requires**: [Other stories that must be completed first]
- **Blocks**: [Other stories waiting on this]

**Risks/Notes**:
- [Any implementation risks, edge cases, or special considerations]
```

---

## 2. Epic: EPIC-01 Authentication & Authorization

### STORY-001: Set Up Laravel Sanctum Authentication

**Epic**: EPIC-01  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 3 points]  
**Assigned To**: [TBD]  

**Technical Story**:  
Install and configure Laravel Sanctum for API token-based authentication to secure API endpoints.

**Acceptance Criteria**:
- **GIVEN** Laravel project is initialized  
  **WHEN** Sanctum package is installed via composer  
  **THEN** Sanctum config file exists and middleware is registered
  
- **GIVEN** Sanctum is configured  
  **WHEN** User makes authenticated API request with Bearer token  
  **THEN** Request is authenticated successfully
  
- **GIVEN** No token provided  
  **WHEN** User makes request to protected endpoint  
  **THEN** 401 Unauthorized response returned

**Implementation Details**:
- Run `composer require laravel/sanctum`
- Publish Sanctum config: `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
- Add Sanctum middleware to `api` middleware group in `kernel.php`
- Run Sanctum migration: `php artisan migrate`
- Update `config/sanctum.php` for token expiration settings

**Testing Requirements**:
- Unit tests: Test token generation, token validation
- Integration tests: Test protected route with/without token

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-002 (Database migrations for users table)
- **Blocks**: STORY-003 (Login endpoint)

---

### STORY-002: Create Database Migrations for Users, Roles, Departments

**Epic**: EPIC-01  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 2 points]  
**Assigned To**: [TBD]  

**Technical Story**:  
Create database schema migrations for user authentication and authorization tables.

**Acceptance Criteria**:
- **GIVEN** Migration files created  
  **WHEN** `php artisan migrate` is run  
  **THEN** Tables `users`, `roles`, `departments` are created in database
  
- **GIVEN** Tables exist  
  **WHEN** Rollback is run  
  **THEN** Tables are dropped cleanly

**Implementation Details**:
- Create migration: `roles` table (id, name, description, permissions JSON, timestamps)
- Create migration: `departments` table (id, name, code, parent_id self-FK, head_user_id FK, timestamps)
- Create migration: `users` table (id, username unique, email unique, password_hash, full_name, role_id FK, department_id FK, is_active, failed_login_attempts, locked_until, last_login, timestamps, deleted_at)
- Add foreign key constraints with appropriate ON DELETE behavior
- Add indexes on username, email, role_id, department_id

**Testing Requirements**:
- Unit tests: None (migration testing via rollback)
- Integration tests: Verify schema exists after migration

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: EPIC-02 database setup
- **Blocks**: STORY-001 (Sanctum needs users table), STORY-004 (Seeders)

---

### STORY-003: Implement Login Endpoint (POST /api/auth/login)

**Epic**: EPIC-01  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 5 points]  
**Assigned To**: [TBD]  

**User Story**:  
As a registered user, I want to log in with my username and password, so that I can access the system.

**Acceptance Criteria**:
- **GIVEN** Valid username and password submitted  
  **WHEN** POST /api/auth/login is called  
  **THEN** 200 OK response with token and user object returned
  
- **GIVEN** Invalid credentials submitted  
  **WHEN** POST /api/auth/login is called  
  **THEN** 401 Unauthorized response with error message returned
  
- **GIVEN** User has 5 failed login attempts  
  **WHEN** Next login attempt made  
  **THEN** 429 Too Many Requests response with "Account locked for 15 minutes" message
  
- **GIVEN** Login attempt rate limit exceeded (5 per minute)  
  **WHEN** 6th login attempt made within 1 minute  
  **THEN** 429 Too Many Requests response

**Implementation Details**:
- Create `AuthController` with `login($request)` method
- Create `LoginRequest` with validation rules (username required, password required)
- Implement account lockout logic in User model:
  - `incrementLoginAttempts()` method
  - `isLockedOut()` method (check `locked_until` timestamp)
  - `resetLoginAttempts()` on successful login
- Apply rate limiting middleware: `throttle:5,1` on login route
- Generate Sanctum token on successful auth: `$user->createToken('auth_token')`
- Return `UserResource` in response

**Testing Requirements**:
- Unit tests:
  - Test `isLockedOut()` logic
  - Test `incrementLoginAttempts()` logic
- Integration tests:
  - Test successful login returns token
  - Test invalid credentials returns 401
  - Test account lockout after 5 failures
  - Test rate limiting (6th request blocked)
- E2E tests: Login flow in browser

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-001 (Sanctum setup), STORY-002 (User table)
- **Blocks**: STORY-010 (Frontend login form)

**Risks/Notes**:
- Rate limiting applies per IP address; may need per-user rate limiting for production

---

### STORY-004: Create Database Seeders for Initial Data

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 2 points]  
**Assigned To**: [TBD]  

**Technical Story**:  
Create seeders to populate roles, sample departments, and initial admin user for development and testing.

**Acceptance Criteria**:
- **GIVEN** Database is migrated  
  **WHEN** `php artisan db:seed` is run  
  **THEN** Roles table populated with 8 roles (Admin, Quality Manager, Dept Head, Doc Controller, Approver, Staff, Auditor, Guest)
  
- **GIVEN** Seeders run  
  **WHEN** Checking users table  
  **THEN** Initial admin user exists with username "admin" and default password

**Implementation Details**:
- Create `RoleSeeder` to insert 8 roles with permissions JSON
- Create `DepartmentSeeder` to insert sample departments (IT, HR, QA, Finance)
- Create `UserSeeder` to insert admin user (username: admin, password: Admin@123, role: Admin)
- Update `DatabaseSeeder` to call all seeders

**Testing Requirements**:
- Integration tests: Verify seeder creates expected records

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-002 (Migrations)
- **Blocks**: None (but helpful for testing other stories)

**Risks/Notes**:
- Default admin password should be changed on first login in production

---

### STORY-005: Implement Logout Endpoint (POST /api/auth/logout)

**Epic**: EPIC-01  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 1 point]  
**Assigned To**: [TBD]  

**User Story**:  
As a logged-in user, I want to log out, so that my session is terminated and token is invalidated.

**Acceptance Criteria**:
- **GIVEN** User is authenticated  
  **WHEN** POST /api/auth/logout is called with Bearer token  
  **THEN** 204 No Content response returned and token is deleted

**Implementation Details**:
- Add `logout()` method to `AuthController`
- Call `$request->user()->currentAccessToken()->delete()`
- Return 204 No Content response
- Protect route with `auth:sanctum` middleware

**Testing Requirements**:
- Integration tests:
  - Test logout deletes token
  - Test subsequent requests with deleted token return 401

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-001 (Sanctum setup)
- **Blocks**: STORY-011 (Frontend logout)

---

### STORY-006: Implement Password Reset Request (POST /api/auth/password/forgot)

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 3 points]  
**Assigned To**: [TBD]  

**User Story**:  
As a user who forgot my password, I want to request a password reset link, so that I can regain access to my account.

**Acceptance Criteria**:
- **GIVEN** Valid email submitted  
  **WHEN** POST /api/auth/password/forgot is called  
  **THEN** 200 OK response returned and email sent with reset link
  
- **GIVEN** Email not in system  
  **WHEN** POST /api/auth/password/forgot is called  
  **THEN** 200 OK response returned (don't reveal user existence) but no email sent
  
- **GIVEN** 3 requests made within 15 minutes  
  **WHEN** 4th request made  
  **THEN** 429 Too Many Requests response (AUTH-009 spec delta)

**Implementation Details**:
- Add `forgotPassword($request)` method to `AuthController`
- Validate email format
- Generate password reset token (Laravel Password Broker)
- Store token in `password_resets` table with expiration (60 minutes)
- Queue email job: `SendPasswordResetEmail::dispatch($user, $token)`
- Apply rate limiter: `throttle:3,15` by email

**Testing Requirements**:
- Integration tests:
  - Test valid email triggers email job
  - Test invalid email returns 200 but doesn't send email
  - Test rate limiting after 3 requests

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-002 (User table), Email configuration
- **Blocks**: STORY-007 (Password reset confirmation), STORY-012 (Frontend password reset)

**Risks/Notes**:
- Email sending requires SMTP or service configured

---

### STORY-007: Implement Password Reset Confirmation (POST /api/auth/password/reset)

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 3 points]  
**Assigned To**: [TBD]  

**User Story**:  
As a user who received a password reset link, I want to set a new password, so that I can log in again.

**Acceptance Criteria**:
- **GIVEN** Valid reset token and new password submitted  
  **WHEN** POST /api/auth/password/reset is called  
  **THEN** 200 OK response returned and password updated
  
- **GIVEN** Invalid or expired token submitted  
  **WHEN** POST /api/auth/password/reset is called  
  **THEN** 400 Bad Request response with error message
  
- **GIVEN** New password doesn't meet complexity requirements  
  **WHEN** POST /api/auth/password/reset is called  
  **THEN** 422 Validation Error response

**Implementation Details**:
- Add `resetPassword($request)` method to `AuthController`
- Validate: token, password, password_confirmation
- Check token exists and not expired (Laravel Password Broker)
- Validate password complexity (min 8 chars, uppercase, lowercase, number, special char)
- Hash password with bcrypt
- Update user password
- Delete used token from `password_resets` table

**Testing Requirements**:
- Integration tests:
  - Test valid token resets password
  - Test expired token fails
  - Test invalid token fails
  - Test weak password rejected

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-006 (Password reset request)
- **Blocks**: STORY-013 (Frontend password reset confirmation)

---

### STORY-008: Implement User Management Endpoints (Admin)

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 5 points]  
**Assigned To**: [TBD]  

**User Story**:  
As an admin, I want to create, view, edit, and deactivate users, so that I can manage system access.

**Acceptance Criteria**:
- **GIVEN** Admin is authenticated  
  **WHEN** GET /api/users is called  
  **THEN** List of users returned with pagination
  
- **GIVEN** Admin submits valid user data  
  **WHEN** POST /api/users is called  
  **THEN** 201 Created response with new user object
  
- **GIVEN** Admin submits user update  
  **WHEN** PUT /api/users/{id} is called  
  **THEN** 200 OK response with updated user
  
- **GIVEN** Non-admin user attempts to access  
  **WHEN** Any user management endpoint called  
  **THEN** 403 Forbidden response

**Implementation Details**:
- Create `UserController` with resourceful methods (index, store, show, update, destroy)
- Create `UserPolicy` to authorize admin-only access
- Create `StoreUserRequest`, `UpdateUserRequest` with validation
- Implement soft delete for user deactivation
- Return `UserResource` in responses

**Testing Requirements**:
- Unit tests: Test UserPolicy authorization
- Integration tests:
  - Test admin can CRUD users
  - Test non-admin gets 403

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-001, STORY-002
- **Blocks**: Frontend user management pages

---

### STORY-009: Implement Session Timeout (30 minutes)

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 2 points]  
**Assigned To**: [TBD]  

**Technical Story**:  
Configure Sanctum token expiration to 30 minutes of inactivity per AUTH-003 requirement.

**Acceptance Criteria**:
- **GIVEN** User logged in  
  **WHEN** 31 minutes pass without API request  
  **THEN** Next API request returns 401 Unauthorized (token expired)

**Implementation Details**:
- Update `config/sanctum.php`: Set `expiration` to 30 (minutes)
- Document token refresh strategy (optional: implement token refresh endpoint)

**Testing Requirements**:
- Integration tests: Test token expires after 30 minutes

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-001 (Sanctum setup)
- **Blocks**: None

**Risks/Notes**:
- Consider implementing token refresh endpoint to avoid frequent re-logins

---

### STORY-010: Frontend: Create Login Page Component (React)

**Epic**: EPIC-01  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 3 points]  
**Assigned To**: [TBD]  

**User Story**:  
As a user, I want a login page where I can enter my credentials, so that I can access the system.

**Acceptance Criteria**:
- **GIVEN** User navigates to /login  
  **WHEN** Page loads  
  **THEN** Login form displayed with username, password fields, and Login button
  
- **GIVEN** User enters valid credentials  
  **WHEN** Login button clicked  
  **THEN** API call to /api/auth/login made, token stored, user redirected to dashboard
  
- **GIVEN** User enters invalid credentials  
  **WHEN** Login button clicked  
  **THEN** Error message displayed below form

**Implementation Details**:
- Create `LoginPage.jsx` component
- Create `LoginForm` component with controlled inputs
- Implement client-side validation (required fields)
- Call `authService.login(credentials)`
- Store token in localStorage
- Update AuthContext state
- Redirect to dashboard on success
- Display error message on failure

**Testing Requirements**:
- Unit tests: Test form validation
- Integration tests: Test successful and failed login flows
- E2E tests: Test full login flow in browser

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-003 (Login API endpoint)
- **Blocks**: Access to protected pages

---

### STORY-011: Frontend: Implement Logout Functionality

**Epic**: EPIC-01  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 1 point]  
**Assigned To**: [TBD]  

**User Story**:  
As a logged-in user, I want a logout button, so that I can securely end my session.

**Acceptance Criteria**:
- **GIVEN** User is logged in  
  **WHEN** Logout button clicked in header  
  **THEN** API call to /api/auth/logout made, token removed, user redirected to login page

**Implementation Details**:
- Add logout button to header component
- Call `authService.logout()`
- Remove token from localStorage
- Clear AuthContext state
- Redirect to /login

**Testing Requirements**:
- E2E tests: Test logout flow

**Definition of Done**:
- [x] Standard DoD checklist applies

**Dependencies**:
- **Requires**: STORY-005 (Logout API)
- **Blocks**: None

---

### STORY-012: Frontend: Create Password Reset Request Page

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 2 points]  
**Assigned To**: [TBD]  

[Similar format as above...]

---

### STORY-013: Frontend: Create Password Reset Confirmation Page

**Epic**: EPIC-01  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 2 points]  
**Assigned To**: [TBD]  

[Similar format as above...]

---

## 3. Epic: EPIC-02 Core Infrastructure & Database

[TBD - 10-15 stories covering database setup, migrations for all entities, seeders, API middleware setup, React project scaffold, routing, etc.]

---

## 4. Epic: EPIC-03 Document CRUD Operations

### STORY-030: Create SOP Controller with CRUD Endpoints

**Epic**: EPIC-03  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 5 points]  

[Similar format...]

---

### STORY-031: Create SOP Form Request Validators

**Epic**: EPIC-03  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 2 points]  

[Similar format...]

---

### STORY-032: Implement SOP Policy (Authorization)

**Epic**: EPIC-03  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 3 points]  

[Similar format...]

---

### STORY-033: Frontend: Create SOP List Page

**Epic**: EPIC-03  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 5 points]  

[Similar format...]

---

### STORY-034: Frontend: Create SOP Form Component

**Epic**: EPIC-03  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 8 points]  

[Including rich text editor, file upload, auto-save logic...]

---

### STORY-035: Implement Auto-Save for Document Forms (SOP-011)

**Epic**: EPIC-03  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 3 points]  

[Auto-save every 60 seconds, show last saved timestamp...]

---

[Continue for all document types: Policy, Work Instruction, Quality Manual, Application Guide]

---

## 5. Epic: EPIC-04 Document Approval Workflow

### STORY-050: Create Approval Service with Workflow Logic

**Epic**: EPIC-04  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 8 points]  

[Submit, approve, reject, delegation methods...]

---

### STORY-051: Create Approval Controller

**Epic**: EPIC-04  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 3 points]  

[Endpoints for listing, approving, rejecting...]

---

### STORY-052: Implement Multi-Level Approval Configuration

**Epic**: EPIC-04  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 5 points]  

[Admin configures approval levels per document type...]

---

### STORY-053: Frontend: Create Approval List Page

**Epic**: EPIC-04  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 3 points]  

[Pending approvals table...]

---

### STORY-054: Frontend: Create Approval Review Modal

**Epic**: EPIC-04  
**Priority**: P0 (Must Have)  
**Story Points**: [TBD - 5 points]  

[Document preview, comment field, approve/reject buttons...]

---

### STORY-055: Implement Approval Escalation (NOTIFY-004)

**Epic**: EPIC-04  
**Priority**: P1 (Should Have)  
**Story Points**: [TBD - 5 points]  

[Escalation at 3, 5, 7 days overdue; supervisor at 10 days...]

---

## 6. Epic: EPIC-05 Document Versioning & History

[TBD - 5-7 stories covering version creation, version history endpoint, diff comparison, frontend version viewer...]

---

## 7. Epic: EPIC-06 Work Order Management

[TBD - 8-10 stories covering CRUD, assignment, status updates, Kanban board, comments...]

---

## 8. Epic: EPIC-07 Meeting Room Booking

[TBD - 6-8 stories covering room CRUD, booking CRUD, conflict detection, calendar integration...]

---

## 9. Epic: EPIC-08 Search & Filtering

[TBD - 5-7 stories covering global search, advanced search, full-text indexing, frontend search UI...]

---

## 10. Epic: EPIC-09 Dashboard & Analytics

[TBD - 6-8 stories covering dashboard API, role-specific widgets, charts, frontend dashboard page...]

---

## 11. Epic: EPIC-10 Audit Trail & Compliance

[TBD - 6-8 stories covering audit logging service, review scheduling, reminders, audit log viewer...]

---

## 12. Epic: EPIC-11 Notifications System

[TBD - 8-10 stories covering notification model, notification service, email jobs, frontend notification bell...]

---

## 13. Epic: EPIC-12 File Upload & Management

[TBD - 5-7 stories covering file upload endpoint, virus scanning, file download, frontend dropzone component...]

---

## 14. Epic: EPIC-13 Frontend Migration (jQuery → React)

[TBD - 20-30 stories, one per major page/component to migrate...]

---

## 15. Epic: EPIC-14 Mobile Responsive UI

[TBD - 10-15 stories covering responsive CSS, mobile nav, card views, touch gestures...]

---

## 16. Epic: EPIC-15 Deployment & DevOps

[TBD - 8-10 stories covering CI/CD setup, environment config, monitoring, SSL certificates...]

---

## 17. Story Summary

**Total Stories Estimated**: [TBD - 100-150 stories]

**Stories by Epic**:
- EPIC-01: 13 stories (9 backend, 4 frontend)
- EPIC-02: [TBD]
- EPIC-03: [TBD]
- ... (continue for all epics)

**Total Story Points**: [TBD after estimation]

**Average Story Size**: [TBD points]

---

## 18. Acceptance Criteria (Document Level)

- [ ] All 15 epics broken down into implementation stories
- [ ] Each story includes: title, user/technical story, acceptance criteria (Given/When/Then), implementation details, testing requirements, dependencies
- [ ] Stories estimated with story points
- [ ] Stories prioritized (P0, P1, P2, P3)
- [ ] Story dependencies mapped
- [ ] Sprint backlog ready for planning
- [ ] Tech Lead and Scrum Master approve story breakdown

---

## 19. Open Questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
| STORY-01 | Story point scale: Fibonacci (1,2,3,5,8,13) or T-shirt (XS, S, M, L, XL)? | Scrum Master | [TBD] |
| STORY-02 | Should all stories include E2E tests or only critical flows? | QA Lead | [TBD] |
| STORY-03 | Code coverage target: 80%, 70%, or lower? | Tech Lead | [TBD] |
| STORY-04 | Should each story be in its own branch or multiple stories per branch? | Tech Lead | [TBD] |

---

**Document Status**: 🟡 TEMPLATE - Awaiting content population  
**Next Steps**: Populate all stories for all 15 epics, estimate story points, prioritize, assign to sprints  
**Estimated Completion**: [TBD - this is the largest document, may take 2-3 days to complete all 100+ stories]
