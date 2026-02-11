# Capability: Authentication

## ADDED Requirements

### Requirement: User Login

Users MUST be able to authenticate with username and password to access the system.

*ID: AUTH-001*

#### Scenario: Successful login with valid credentials
- WHEN a user enters a valid username and password
- THEN the system creates a session
- AND redirects the user to the dashboard
- AND stores authentication token in HTTP-only cookie

#### Scenario: Failed login with invalid credentials
- WHEN a user enters an invalid username or password
- THEN the system displays an error message "Invalid username or password"
- AND increments the failed login attempt counter
- AND does not create a session

### Requirement: Session Management

Authenticated sessions MUST expire after 30 minutes of inactivity to protect against unauthorized access.

*ID: AUTH-002*

#### Scenario: Session expires after inactivity timeout
- GIVEN a user has been inactive for 30 minutes
- WHEN the user attempts to perform any action
- THEN the system logs the user out
- AND redirects to the login page
- AND displays message "Session expired. Please log in again."

#### Scenario: Session remains active during user activity
- GIVEN a user performs actions every 5 minutes
- WHEN the user continues to interact with the system
- THEN the session timeout counter resets with each action
- AND the user remains logged in

### Requirement: Account Lockout

After 5 consecutive failed login attempts, the user account MUST be locked for 15 minutes to prevent brute force attacks.

*ID: AUTH-003*

#### Scenario: Account locked after 5 failed attempts
- GIVEN a user has failed to log in 4 times
- WHEN the user fails to log in a 5th time
- THEN the account is locked for 15 minutes
- AND subsequent login attempts show "Account locked. Try again in X minutes."
- AND the lockout event is logged in the audit trail

#### Scenario: Account unlocks after 15-minute lockout period
- GIVEN an account was locked 15 minutes ago
- WHEN the user attempts to log in with correct credentials
- THEN the account is unlocked
- AND the user is successfully logged in
- AND the lockout count is reset

### Requirement: Password Policy

User passwords MUST meet minimum security requirements to reduce unauthorized access risk.

*ID: AUTH-004*

#### Scenario: Password meets all requirements
- WHEN a user sets a password with minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
- THEN the system accepts the password
- AND stores it as a bcrypt/argon2 hash (never plaintext)

#### Scenario: Password fails validation
- WHEN a user sets a password with only 6 characters
- THEN the system rejects the password
- AND displays error "Password MUST be at least 8 characters"

### Requirement: Password Expiration

Passwords MUST expire after 90 days and users MUST change them to maintain security.

*ID: AUTH-005*

#### Scenario: User prompted to change expired password
- GIVEN a user's password is 91 days old
- WHEN the user logs in successfully
- THEN the system forces password change before allowing dashboard access
- AND displays "Your password has expired. Please change it."

### Requirement: Password Reset

Users who forget their password MUST be able to reset it securely via email verification.

*ID: AUTH-006*

#### Scenario: User requests password reset
- WHEN a user clicks "Forgot Password" and enters their email
- THEN the system sends a password reset email with a unique token
- AND the token expires after 1 hour
- AND the token can only be used once

### Requirement: User Logout

Users MUST be able to explicitly log out to terminate their session.

*ID: AUTH-007*

#### Scenario: User logs out
- WHEN a user clicks the logout button
- THEN the session is terminated
- AND the authentication token is invalidated
- AND the user is redirected to the login page

### Requirement: Force Logout on Password Change

When a user's password is changed (by admin or self), all active sessions for that user MUST be terminated.

*ID: AUTH-008*

#### Scenario: All sessions terminated after password change
- GIVEN a user has 2 active sessions on different devices
- WHEN an administrator changes the user's password
- THEN all sessions for that user are invalidated
- AND the user MUST log in again on all devices

---

**Related Capabilities**:
- `authorization` (roles determine accessible areas after login)
- `audit-logging` (login/logout events are logged)
- `notification-system` (password reset emails, lockout notifications)

---

**Version**: 1.0.0  
**Status**: ADDED (baseline specification)  
**Date**: February 10, 2026
