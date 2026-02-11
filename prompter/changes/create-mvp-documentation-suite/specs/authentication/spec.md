# authentication Spec Delta

## ADDED Requirements

### Requirement: Rate Limiting on Authentication Endpoints

The system MUST implement rate limiting on authentication endpoints to prevent brute force attacks and abuse.

*ID: AUTH-009*

**Rationale**: Per PRD US-03 and PRD Security Requirements, password reset and login endpoints are vulnerable to abuse without rate limiting. This protects against credential stuffing, brute force attacks, and denial-of-service attempts.

#### Scenario: Login rate limit allows normal authentication
- GIVEN a user has not exceeded the login rate limit
- WHEN the user attempts to log in with valid credentials
- THEN the login succeeds normally
- AND the rate limit counter increments by 1

#### Scenario: Login rate limit blocks excessive attempts
- GIVEN a user has attempted 5 logins in the past minute (within rate limit threshold)
- WHEN the user attempts a 6th login
- THEN the system returns HTTP 429 Too Many Requests
- AND displays error "Too many  login attempts. Please wait 60 seconds and try again."
- AND the login is not processed
- AND the attempt is logged in audit trail with reason "RATE_LIMIT_EXCEEDED"

#### Scenario: Password reset rate limit prevents abuse
- GIVEN a user has requested 3 password resets in the past 15 minutes
- WHEN the user requests a 4th password reset
- THEN the system returns error "Too many password reset requests. Please try again in X minutes."
- AND does not send a password reset email
- AND logs the rate limit violation with IP address

#### Scenario: Rate limit counter resets after cooling period
- GIVEN a user hit the login rate limit 2 minutes ago
- WHEN the user attempts to log in now
- THEN the rate limit counter has reset
- AND the login attempt is processed normally

**Rate Limit Specifications**:
- **Login endpoint (`/api/auth/login`)**: Max 5 attempts per minute per IP address
- **Password reset endpoint (`/api/auth/password-reset`)**: Max 3 requests per 15 minutes per email address
- **Registration endpoint (`/api/auth/register`)**: Max 10 registrations per hour per IP address (prevents automated account creation)

**Implementation Notes**:
- Use sliding window rate limiting (not fixed window to prevent burst attacks at window boundaries)
- Rate limit by combination of IP address and username/email to balance security and usability
- Implement exponential backoff for repeated violations (1 min → 5 min → 15 min → 1 hour)
- Admin users can view rate limit violations in audit logs and temporarily whitelist IPs if needed

---

**Related PRD Stories**:
- US-01 (login security)
- US-03 (password reset rate limiting note)

**Related Capabilities**:
- `audit-logging` (rate limit violations logged)
- `notification-system` (optional: alert admins on sustained rate limit violations indicating attack)
