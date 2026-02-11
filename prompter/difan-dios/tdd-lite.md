# TDD-Lite: Technical Design Document

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Project**            | Difan-DIOS (Difan Integrated Operational System) |
| **Version**            | 1.0.0 (DRAFT - TEMPLATE)       |
| **Date**               | February 10, 2026              |
| **Status**             | 🟡 Template - Awaiting Content |
| **Author**             | TBD                            |
| **Reviewers**          | Backend Lead, Frontend Lead, Database Architect |
| **Dependencies**       | FSD, ERD, API Contract, UI Wireframes complete |

---

## 1. Introduction

### 1.1 Purpose
This Technical Design Document (TDD-Lite) provides implementation guidance for developers building Difan-DIOS MVP 1. It documents architectural patterns, technology choices, coding conventions, and best practices to ensure consistent, maintainable, and scalable implementation.

### 1.2 Scope
This document covers:
- Backend implementation patterns (Laravel)
- Frontend implementation patterns (React)
- Database design patterns (MySQL)
- Security implementation
- Testing strategies
- Performance optimization
- Deployment architecture

### 1.3 Reference Documents
- **FSD**: `prompter/difan-dios/fsd.md` - Functional requirements
- **ERD**: `prompter/difan-dios/erd.md` - Database schema
- **API Contract**: `prompter/difan-dios/api-contract.md` - REST API specification
- **UI Wireframes**: `prompter/difan-dios/ui-wireframes.md` - Screen layouts
- **AGENTS.md**: `AGENTS.md` - Coding conventions (Section 11)

### 1.4 Architectural Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React 18.x Frontend (Vite Build)                     │  │
│  │  - React Router (routing)                             │  │
│  │  - React Context/Redux (state)                        │  │
│  │  - Axios (HTTP client)                                │  │
│  │  - React Bootstrap (UI components)                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS/TLS 1.2+
                          │ JSON REST API
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                Application Server                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Laravel 10.x/11.x (PHP 8.2+)                         │  │
│  │  - Sanctum (API authentication)                       │  │
│  │  - Eloquent ORM (database)                            │  │
│  │  - Policies (authorization)                           │  │
│  │  - Queues (async jobs)                                │  │
│  │  - Storage (file management)                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ SQL Queries
                          ▼
┌─────────────────────────────────────────────────────────────┐
│               Database Server (MySQL 8.x)                   │
│  - InnoDB engine (ACID transactions)                        │
│  - Foreign key constraints                                  │
│  - Full-text indexes (document search)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack Justification

### 2.1 Backend: Laravel 10.x/11.x

**Selection Rationale**:
- Mature PHP framework with extensive ecosystem
- Built-in authentication (Sanctum for API tokens)
- Eloquent ORM for expressive database queries
- Queue system for background jobs (notifications, reports)
- Strong community support and documentation

**Alternatives Considered**:
- [TBD - Document alternatives like Node.js/Express, Django, ASP.NET Core and why Laravel chosen]

**Trade-offs**:
- ✅ Pros: Rapid development, comprehensive features, strong security defaults
- ❌ Cons: PHP performance vs compiled languages, potential vendor lock-in

### 2.2 Frontend: React 18.x

**Selection Rationale**:
- Component-based architecture for reusability
- Large ecosystem of libraries (React Router, React Bootstrap)
- Strong TypeScript support (future migration path)
- Virtual DOM for performance
- Gradual migration from existing jQuery templates

**Alternatives Considered**:
- [TBD - Document alternatives like Vue.js, Angular, Svelte and rationale for React]

**Trade-offs**:
- ✅ Pros: Developer familiarity, abundant resources, strong community
- ❌ Cons: Learning curve for team, bundle size considerations

### 2.3 Database: MySQL 8.x

**Selection Rationale**:
- Industry-standard relational database
- ACID compliance for data integrity
- Full-text search support (document content search)
- JSON column type for flexible data (permissions, metadata)
- Wide hosting support

**Alternatives Considered**:
- [TBD - PostgreSQL, MariaDB, SQL Server - why MySQL chosen]

**Trade-offs**:
- ✅ Pros: Reliability, well-documented, cost-effective
- ❌ Cons: JSON querying less powerful than PostgreSQL

---

## 3. Backend Implementation Patterns

### 3.1 Project Structure (Laravel)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # Authentication endpoints
│   │   │   ├── UserController.php          # User management
│   │   │   ├── Documents/
│   │   │   │   ├── SopController.php       # SOP CRUD
│   │   │   │   ├── PolicyController.php    # Policy CRUD
│   │   │   │   └── ...                     # Other document types
│   │   │   ├── ApprovalController.php      # Approval workflow
│   │   │   ├── WorkOrderController.php     # Work order management
│   │   │   └── BookingController.php       # Meeting room booking
│   │   ├── Middleware/
│   │   │   ├── Authenticate.php            # Sanctum auth
│   │   │   ├── CheckRole.php               # Role-based access
│   │   │   └── ThrottleRequests.php        # Rate limiting
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequest.php        # Login validation
│   │   │   │   └── RegisterRequest.php     # Registration validation
│   │   │   ├── Documents/
│   │   │   │   ├── StoreSopRequest.php     # SOP creation validation
│   │   │   │   └── UpdateSopRequest.php    # SOP update validation
│   │   │   └── ...
│   │   └── Resources/
│   │       ├── UserResource.php            # User API response transformer
│   │       ├── SopResource.php             # SOP response transformer
│   │       └── ...
│   ├── Models/
│   │   ├── User.php                        # User model
│   │   ├── Role.php                        # Role model
│   │   ├── Department.php                  # Department model
│   │   ├── Documents/
│   │   │   ├── Document.php                # Base document model
│   │   │   ├── Sop.php                     # SOP model (extends Document)
│   │   │   ├── Policy.php                  # Policy model
│   │   │   └── ...
│   │   ├── Approval.php                    # Approval model
│   │   ├── WorkOrder.php                   # Work order model
│   │   └── Booking.php                     # Booking model
│   ├── Policies/
│   │   ├── SopPolicy.php                   # SOP authorization rules
│   │   ├── ApprovalPolicy.php              # Approval authorization
│   │   └── ...
│   ├── Services/
│   │   ├── ApprovalService.php             # Approval workflow logic
│   │   ├── NotificationService.php         # Notification logic
│   │   ├── DocumentVersionService.php      # Versioning logic
│   │   └── FileUploadService.php           # File handling
│   ├── Jobs/
│   │   ├── SendNotificationEmail.php       # Async email sending
│   │   ├── GenerateDocumentPdf.php         # PDF generation
│   │   └── ...
│   └── Events/
│       ├── DocumentApproved.php            # Event: document approved
│       ├── WorkOrderAssigned.php           # Event: WO assigned
│       └── ...
├── config/
│   ├── auth.php                            # Authentication config
│   ├── database.php                        # Database connections
│   └── filesystems.php                     # File storage config
├── database/
│   ├── migrations/                         # Database migrations
│   └── seeders/                            # Seed data (roles, users)
├── routes/
│   └── api.php                             # API route definitions
└── tests/
    ├── Feature/                            # Integration tests
    └── Unit/                               # Unit tests
```

**Pattern**: Feature-based organization within Controllers, shared Services for business logic

---

### 3.2 Authentication Implementation (Laravel Sanctum)

**Pattern**: Token-based API authentication

**Login Flow**:
```php
// app/Http/Controllers/AuthController.php
public function login(LoginRequest $request)
{
    $credentials = $request->validated();
    
    // Check for account lockout (AUTH-002: 5 failed attempts)
    $user = User::where('username', $credentials['username'])->first();
    
    if ($user && $user->isLockedOut()) {
        return response()->json([
            'success' => false,
            'error' => [
                'code' => 'ACCOUNT_LOCKED',
                'message' => 'Account locked. Try again in 15 minutes.'
            ]
        ], 429);
    }
    
    // Attempt authentication
    if (!Auth::attempt($credentials)) {
        // Increment failed login attempts
        if ($user) {
            $user->incrementLoginAttempts();
        }
        
        return response()->json([
            'success' => false,
            'error' => [
                'code' => 'INVALID_CREDENTIALS',
                'message' => 'Invalid username or password'
            ]
        ], 401);
    }
    
    // Reset failed login attempts on success
    $user = Auth::user();
    $user->resetLoginAttempts();
    
    // Generate Sanctum token
    $token = $user->createToken('auth_token')->plainTextToken;
    
    return response()->json([
        'success' => true,
        'data' => [
            'token' => $token,
            'user' => new UserResource($user)
        ]
    ]);
}
```

**Middleware Protection**:
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'me']);
    Route::apiResource('/sops', SopController::class);
    // ... other protected routes
});
```

**Session Timeout** (AUTH-003: 30 minutes inactivity):
```php
// config/session.php
'lifetime' => 30, // minutes
```

---

### 3.3 Authorization Implementation (Policies)

**Pattern**: Laravel Policies for resource-level authorization

**Example: SOP Policy**:
```php
// app/Policies/SopPolicy.php
class SopPolicy
{
    /**
     * Determine if user can view the SOP
     */
    public function view(User $user, Sop $sop): bool
    {
        // Staff can view published SOPs
        if ($sop->status === 'published') {
            return true;
        }
        
        // Can view own drafts
        if ($sop->created_by === $user->id) {
            return true;
        }
        
        // Department head can view department SOPs
        if ($user->isDepartmentHead() && $sop->department_id === $user->department_id) {
            return true;
        }
        
        // Admins can view all
        return $user->isAdmin();
    }
    
    /**
     * Determine if user can update the SOP
     */
    public function update(User $user, Sop $sop): bool
    {
        // Can only edit drafts
        if ($sop->status !== 'draft') {
            return false;
        }
        
        // Can edit own drafts
        if ($sop->created_by === $user->id) {
            return true;
        }
        
        // Admins can edit all
        return $user->isAdmin();
    }
    
    /**
     * Determine if user can submit for approval
     */
    public function submit(User $user, Sop $sop): bool
    {
        // Must be draft
        if ($sop->status !== 'draft') {
            return false;
        }
        
        // Creator or admin can submit
        return $sop->created_by === $user->id || $user->isAdmin();
    }
}
```

**Controller Usage**:
```php
// app/Http/Controllers/Documents/SopController.php
public function update(UpdateSopRequest $request, Sop $sop)
{
    $this->authorize('update', $sop); // Throws 403 if unauthorized
    
    $sop->update($request->validated());
    
    return new SopResource($sop);
}
```

---

### 3.4 Document Lifecycle Implementation

**Service Pattern**: Business logic in dedicated service class

**Approval Workflow Service**:
```php
// app/Services/ApprovalService.php
class ApprovalService
{
    /**
     * Submit document for approval, creating approval chain
     */
    public function submitForApproval(Document $document, User $submitter): void
    {
        DB::transaction(function () use ($document, $submitter) {
            // Update document status
            $document->update(['status' => 'submitted']);
            
            // Get approval levels for this document type
            $approvalLevels = ApprovalLevel::where('document_type', $document->document_type)
                ->where('is_required', true)
                ->orderBy('level')
                ->get();
            
            // Create approval records for each level
            foreach ($approvalLevels as $level) {
                $approver = $this->getApproverForLevel($level, $document->department_id);
                
                Approval::create([
                    'document_id' => $document->id,
                    'approver_id' => $approver->id,
                    'approval_level' => $level->level,
                    'status' => 'pending'
                ]);
            }
            
            // Trigger notification to first approver
            $firstApproval = Approval::where('document_id', $document->id)
                ->where('approval_level', 1)
                ->first();
            
            event(new DocumentSubmittedForApproval($document, $firstApproval->approver));
        });
    }
    
    /**
     * Approve a document, advance to next approval level or publish
     */
    public function approve(Approval $approval, User $approver, ?string $comments = null): void
    {
        DB::transaction(function () use ($approval, $approver, $comments) {
            // Update approval record
            $approval->update([
                'status' => 'approved',
                'comments' => $comments,
                'action_date' => now()
            ]);
            
            $document = $approval->document;
            
            // Check if all approvals at this level are done
            $currentLevel = $approval->approval_level;
            $pendingAtLevel = Approval::where('document_id', $document->id)
                ->where('approval_level', $currentLevel)
                ->where('status', 'pending')
                ->count();
            
            if ($pendingAtLevel === 0) {
                // All approvals at current level done, check for next level
                $nextLevelApproval = Approval::where('document_id', $document->id)
                    ->where('approval_level', '>', $currentLevel)
                    ->orderBy('approval_level')
                    ->first();
                
                if ($nextLevelApproval) {
                    // Notify next level approver
                    event(new ApprovalEscalated($document, $nextLevelApproval->approver));
                } else {
                    // Final approval, publish document
                    $document->update(['status' => 'approved']);
                    event(new DocumentFullyApproved($document));
                }
            }
        });
    }
    
    /**
     * Reject a document, return to draft status
     */
    public function reject(Approval $approval, User $approver, string $reason): void
    {
        DB::transaction(function () use ($approval, $approver, $reason) {
            $approval->update([
                'status' => 'rejected',
                'comments' => $reason,
                'action_date' => now()
            ]);
            
            // Set all other pending approvals to null (workflow stopped)
            Approval::where('document_id', $approval->document_id)
                ->where('status', 'pending')
                ->delete();
            
            // Return document to draft
            $approval->document->update(['status' => 'draft']);
            
            // Notify submitter
            event(new DocumentRejected($approval->document, $approver, $reason));
        });
    }
}
```

---

### 3.5 Document Versioning Implementation

**Pattern**: Immutable version history table

**Version Creation**:
```php
// app/Services/DocumentVersionService.php
class DocumentVersionService
{
    /**
     * Create a new version when document is published or significantly edited
     */
    public function createVersion(Document $document, string $changesSummary): DocumentVersion
    {
        return DocumentVersion::create([
            'document_id' => $document->id,
            'version_number' => $this->getNextVersionNumber($document),
            'content' => $document->content, // Snapshot of content
            'file_path' => $document->file_path, // Snapshot of file
            'changes_summary' => $changesSummary,
            'created_by' => auth()->id()
        ]);
    }
    
    /**
     * Generate next version number (semantic: major.minor)
     */
    private function getNextVersionNumber(Document $document): string
    {
        $latestVersion = DocumentVersion::where('document_id', $document->id)
            ->orderByDesc('version_number')
            ->first();
        
        if (!$latestVersion) {
            return '1.0';
        }
        
        // Increment minor version (major version changes manual)
        [$major, $minor] = explode('.', $latestVersion->version_number);
        return $major . '.' . ($minor + 1);
    }
    
    /**
     * Compare two versions and return diff
     */
    public function compareVersions(DocumentVersion $v1, DocumentVersion $v2): array
    {
        // [TBD - Implement text diff algorithm or use library like sebastian/diff]
        return [
            'added_lines' => [],
            'removed_lines' => [],
            'changed_lines' => []
        ];
    }
}
```

---

### 3.6 File Upload Implementation

**Pattern**: Laravel Storage with virus scanning

**File Upload Service**:
```php
// app/Services/FileUploadService.php
class FileUploadService
{
    /**
     * Upload and validate file
     */
    public function upload(UploadedFile $file, string $path = 'documents'): string
    {
        // Validate file type (whitelist)
        $allowedMimeTypes = ['application/pdf', 'application/msword', /* ... */];
        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            throw new InvalidFileTypeException('File type not allowed');
        }
        
        // Validate file size (max 10MB)
        $maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if ($file->getSize() > $maxSize) {
            throw new FileTooLargeException('File size exceeds 10MB limit');
        }
        
        // Virus scan (integrate with ClamAV or VirusTotal API)
        if (!$this->scanForVirus($file)) {
            throw new VirusDetectedException('Virus detected in uploaded file');
        }
        
        // Generate unique filename (prevent overwrites)
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // Store file (use 'local' disk for dev, 's3' for production)
        $filePath = $file->storeAs($path, $filename, 'local');
        
        return $filePath;
    }
    
    /**
     * Scan file for viruses
     */
    private function scanForVirus(UploadedFile $file): bool
    {
        // [TBD - Integrate ClamAV or third-party API]
        // For MVP, may defer virus scanning and implement later
        return true; // Placeholder: assume clean
    }
}
```

---

### 3.7 Background Jobs (Queues)

**Pattern**: Laravel Queues for async processing

**Email Notification Job**:
```php
// app/Jobs/SendNotificationEmail.php
class SendNotificationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    public $user;
    public $notification;
    
    public function __construct(User $user, Notification $notification)
    {
        $this->user = $user;
        $this->notification = $notification;
    }
    
    public function handle()
    {
        Mail::to($this->user->email)->send(new NotificationMail($this->notification));
        
        // Mark email as sent
        $this->notification->update(['email_sent' => true, 'email_sent_at' => now()]);
    }
    
    /**
     * Handle job failure
     */
    public function failed(\Throwable $exception)
    {
        Log::error('Failed to send notification email', [
            'user_id' => $this->user->id,
            'notification_id' => $this->notification->id,
            'error' => $exception->getMessage()
        ]);
    }
}
```

**Dispatching Job**:
```php
// app/Listeners/SendApprovalNotification.php
public function handle(DocumentSubmittedForApproval $event)
{
    $notification = Notification::create([
        'user_id' => $event->approver->id,
        'type' => 'approval_request',
        'data' => [
            'document_id' => $event->document->id,
            'document_title' => $event->document->title
        ]
    ]);
    
    // Dispatch async email job
    SendNotificationEmail::dispatch($event->approver, $notification);
}
```

---

### 3.8 Rate Limiting Implementation (AUTH-009 Spec Delta)

**Pattern**: Laravel Throttle Middleware

**Route-Level Rate Limiting**:
```php
// routes/api.php
Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1'); // 5 attempts per minute

Route::post('/auth/password/forgot', [AuthController::class, 'forgotPassword'])
    ->middleware('throttle:3,15'); // 3 attempts per 15 minutes

Route::middleware('auth:sanctum')->group(function () {
    // General API rate limit: 60 requests per minute per user
    Route::middleware('throttle:60,1')->group(function () {
        Route::apiResource('/sops', SopController::class);
        // ... other routes
    });
});
```

**Custom Rate Limiter** (per-email for password reset):
```php
// app/Providers/RouteServiceProvider.php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

public function boot()
{
    RateLimiter::for('password-reset', function (Request $request) {
        return Limit::perMinutes(15, 3)->by($request->input('email'));
    });
}

// Usage in routes/api.php
Route::post('/auth/password/forgot', [AuthController::class, 'forgotPassword'])
    ->middleware('throttle:password-reset');
```

---

## 4. Frontend Implementation Patterns (React)

### 4.1 Project Structure (React + Vite)

```
frontend/
├── src/
│   ├── main.jsx                        # Entry point
│   ├── App.jsx                         # Root component
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx              # App header
│   │   │   ├── Sidebar.jsx             # Navigation sidebar
│   │   │   ├── Breadcrumb.jsx          # Breadcrumb navigation
│   │   │   └── MasterLayout.jsx        # Master page layout
│   │   ├── common/
│   │   │   ├── Button.jsx              # Reusable button
│   │   │   ├── DataTable.jsx           # Reusable table
│   │   │   ├── Modal.jsx               # Reusable modal
│   │   │   ├── FormField.jsx           # Form input wrapper
│   │   │   └── StatusBadge.jsx         # Status indicator
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx           # Login form
│   │   │   └── PasswordResetForm.jsx   # Password reset
│   │   ├── documents/
│   │   │   ├── SopList.jsx             # SOP listing table
│   │   │   ├── SopForm.jsx             # SOP create/edit form
│   │   │   ├── SopDetail.jsx           # SOP detail view
│   │   │   └── DocumentFilters.jsx     # Document filter controls
│   │   ├── approvals/
│   │   │   ├── ApprovalList.jsx        # Pending approvals list
│   │   │   └── ApprovalModal.jsx       # Approval review modal
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.jsx               # Dashboard page
│   │   ├── documents/
│   │   │   ├── SopsPage.jsx            # SOP list page
│   │   │   ├── CreateSopPage.jsx       # SOP creation page
│   │   │   └── SopDetailPage.jsx       # SOP detail page
│   │   ├── approvals/
│   │   │   └── ApprovalsPage.jsx       # Approvals page
│   │   └── ...
│   ├── services/
│   │   ├── api.js                      # Axios instance (base config)
│   │   ├── authService.js              # Auth API calls
│   │   ├── sopService.js               # SOP API calls
│   │   ├── approvalService.js          # Approval API calls
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.js                  # Authentication hook
│   │   ├── usePermissions.js           # Authorization hook
│   │   ├── useFetch.js                 # Data fetching hook
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx             # Authentication context
│   │   ├── NotificationContext.jsx     # Notification context
│   │   └── ...
│   ├── utils/
│   │   ├── validation.js               # Client-side validation helpers
│   │   ├── formatters.js               # Date, number formatters
│   │   └── constants.js                # App constants
│   └── styles/
│       ├── global.css                  # Global styles
│       └── variables.css               # CSS variables
├── public/
│   └── index.html                      # HTML template
├── vite.config.js                      # Vite build config
└── package.json                        # Dependencies
```

---

### 4.2 Authentication Implementation (React Context)

**Auth Context**:
```jsx
// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      authService.getMe()
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('auth_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('auth_token', token);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Auth Service**:
```javascript
// src/services/authService.js
import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data.data; // { token, user }
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getMe: async () => {
    const response = await api.get('/user');
    return response.data.data;
  },

  forgotPassword: async (email) => {
    await api.post('/auth/password/forgot', { email });
  },

  resetPassword: async (token, password, passwordConfirmation) => {
    await api.post('/auth/password/reset', {
      token,
      password,
      password_confirmation: passwordConfirmation
    });
  }
};
```

**Axios Interceptor** (attach token to requests):
```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor: attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 (unauthorized)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

### 4.3 Protected Routes

**Route Guard**:
```jsx
// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or spinner component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
```

**Usage in Router**:
```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MasterLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="sops" element={<SopsPage />} />
          <Route path="sops/create" element={<CreateSopPage />} />
          {/* ... other routes */}
        </Route>
        
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 4.4 Data Fetching Pattern

**Custom Hook** (useFetch):
```javascript
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFetch = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall();
        if (!isCancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.response?.data?.error?.message || 'An error occurred');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true; // Cleanup on unmount
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};
```

**Usage in Component**:
```jsx
// src/pages/documents/SopsPage.jsx
import { useFetch } from '../../hooks/useFetch';
import { sopService } from '../../services/sopService';

export const SopsPage = () => {
  const { data: sops, loading, error, refetch } = useFetch(
    () => sopService.getAll({ status: 'published' }),
    []
  );

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h1>SOPs</h1>
      <DataTable data={sops} columns={columns} />
    </div>
  );
};
```

---

### 4.5 Form Handling Pattern

**Controlled Components with Validation**:
```jsx
// src/components/documents/SopForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sopService } from '../../services/sopService';
import { validateSopForm } from '../../utils/validation';

export const SopForm = ({ initialData = {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    department_id: initialData.department_id || '',
    effective_date: initialData.effective_date || '',
    description: initialData.description || ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = validateSopForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      await sopService.create(formData);
      navigate('/sops'); // Redirect to list page
    } catch (error) {
      // Server validation errors
      if (error.response?.data?.error?.details) {
        const serverErrors = {};
        error.response.data.error.details.forEach(detail => {
          serverErrors[detail.field] = detail.message;
        });
        setErrors(serverErrors);
      } else {
        alert('Failed to save SOP. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />
      
      <FormField
        label="Category"
        name="category"
        type="select"
        value={formData.category}
        onChange={handleChange}
        options={[
          { value: '', label: 'Select Category' },
          { value: 'security', label: 'Security' },
          { value: 'operations', label: 'Operations' }
        ]}
        error={errors.category}
      />

      {/* ... other fields */}

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/sops')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
```

---

### 4.6 Auto-Save Implementation (SOP-011 Spec Delta)

**Pattern**: Debounced auto-save on form changes

```javascript
// src/hooks/useAutoSave.js
import { useEffect, useRef } from 'react';

export const useAutoSave = (formData, saveFunction, delay = 60000) => {
  const timeoutRef = useRef(null);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      try {
        await saveFunction(formData);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, delay);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formData, saveFunction, delay]);

  return { lastSaved };
};
```

**Usage in Form**:
```jsx
const { lastSaved } = useAutoSave(
  formData,
  (data) => sopService.saveDraft(sopId, data),
  60000 // 60 seconds
);

// Display last saved time
{lastSaved && (
  <small className="text-muted">
    Last saved at {lastSaved.toLocaleTimeString()}
  </small>
)}
```

---

## 5. Database Patterns

### 5.1 Migration Best Practices

**Dependency Order**:
1. Core tables (roles, departments)
2. User table (references roles, departments)
3. Document tables (references users, departments)
4. Workflow tables (approvals, versions)
5. Operational tables (work orders, bookings)
6. Audit tables

**Example Migration**:
```php
// database/migrations/2026_02_01_000003_create_documents_table.php
public function up()
{
    Schema::create('documents', function (Blueprint $table) {
        $table->id();
        $table->string('document_type', 50); // STI discriminator
        $table->string('document_number')->unique();
        $table->string('title');
        $table->text('description')->nullable();
        $table->longText('content')->nullable();
        $table->string('category', 100)->nullable();
        
        $table->foreignId('department_id')
              ->constrained('departments')
              ->onDelete('restrict'); // Prevent deleting dept with active docs
        
        $table->foreignId('created_by')
              ->constrained('users')
              ->onDelete('restrict');
        
        $table->enum('status', ['draft', 'submitted', 'in_review', 'approved', 'rejected', 'published', 'archived'])
              ->default('draft');
        
        $table->string('version', 20)->default('1.0');
        $table->date('effective_date')->nullable();
        $table->date('review_date')->nullable();
        $table->string('file_path')->nullable();
        
        $table->timestamps();
        $table->softDeletes(); // Soft delete support
        
        // Indexes
        $table->index('status');
        $table->index('department_id');
        $table->index(['status', 'department_id']); // Composite for filtered queries
        $table->fullText(['title', 'description']); // Full-text search
    });
}
```

---

### 5.2 Eloquent Model Patterns

**Base Document Model** (Single Table Inheritance):
```php
// app/Models/Documents/Document.php
class Document extends Model
{
    use SoftDeletes;

    protected $casts = [
        'effective_date' => 'date',
        'review_date' => 'date'
    ];

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function approvals()
    {
        return $this->hasMany(Approval::class);
    }

    public function versions()
    {
        return $this->hasMany(DocumentVersion::class)->orderByDesc('version_number');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeForDepartment($query, $departmentId)
    {
        return $query->where('department_id', $departmentId);
    }
}
```

**SOP Model** (Inherits from Document):
```php
// app/Models/Documents/Sop.php
class Sop extends Document
{
    protected $table = 'documents';

    // Automatically set document_type
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($sop) {
            $sop->document_type = 'sop';
        });
    }

    // Global scope: only retrieve SOPs
    protected static function booted()
    {
        static::addGlobalScope('type', function ($query) {
            $query->where('document_type', 'sop');
        });
    }

    // SOP-specific logic
    public function generateSopNumber(): string
    {
        $year = date('Y');
        $count = self::whereYear('created_at', $year)->count() + 1;
        return sprintf('SOP-%s-%03d', $year, $count);
    }
}
```

---

### 5.3 Query Optimization

**N+1 Query Prevention**:
```php
// Bad: N+1 queries
$sops = Sop::all();
foreach ($sops as $sop) {
    echo $sop->creator->name; // Additional query per SOP
}

// Good: Eager loading
$sops = Sop::with('creator', 'department')->get();
foreach ($sops as $sop) {
    echo $sop->creator->name; // No additional queries
}
```

**Chunking for Large Datasets**:
```php
// Process large datasets in chunks to avoid memory issues
Sop::chunk(100, function ($sops) {
    foreach ($sops as $sop) {
        // Process SOP
    }
});
```

---

## 6. Security Implementation

### 6.1 Input Validation

**Form Request Validation**:
```php
// app/Http/Requests/Documents/StoreSopRequest.php
class StoreSopRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Authorization handled by policy
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:500',
            'category' => 'nullable|string|max:100',
            'department_id' => 'required|exists:departments,id',
            'effective_date' => 'required|date|after_or_equal:today',
            'review_date' => 'nullable|date|after:effective_date',
            'description' => 'nullable|string|max:5000',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:10240' // 10MB
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'The title field is required.',
            'effective_date.after_or_equal' => 'Effective date must be today or in the future.',
            'file.max' => 'File size must not exceed 10MB.'
        ];
    }
}
```

---

### 6.2 SQL Injection Prevention

**Use Eloquent ORM** (automatic parameter binding):
```php
// Safe: Eloquent automatically binds parameters
$sops = Sop::where('status', 'published')
    ->where('department_id', $request->department_id)
    ->get();

// If raw SQL necessary, use parameter binding
$sops = DB::select('SELECT * FROM documents WHERE status = ? AND department_id = ?', 
    ['published', $request->department_id]);
```

---

### 6.3 XSS Prevention

**Output Escaping** (React automatically escapes):
```jsx
// Safe: React escapes by default
<div>{userInput}</div>

// Unsafe: dangerouslySetInnerHTML bypasses escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // Avoid unless sanitized
```

**Sanitize Rich Text** (if rendering HTML from Quill editor):
```javascript
import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(userInput);
```

---

### 6.4 CSRF Protection

Laravel includes CSRF protection by default for web routes. For API routes using Sanctum, use cookie-based authentication for SPA.

---

## 7. Testing Strategies

### 7.1 Backend Testing (Laravel)

**Unit Test Example**:
```php
// tests/Unit/ApprovalServiceTest.php
class ApprovalServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_submit_for_approval_creates_approval_chain()
    {
        $document = Sop::factory()->create(['status' => 'draft']);
        $submitter = User::factory()->create();
        
        $approvalService = new ApprovalService();
        $approvalService->submitForApproval($document, $submitter);
        
        $this->assertEquals('submitted', $document->fresh()->status);
        $this->assertCount(3, $document->approvals); // Assuming 3 approval levels
        $this->assertEquals('pending', $document->approvals->first()->status);
    }
}
```

**Feature Test Example** (API endpoint):
```php
// tests/Feature/SopControllerTest.php
class SopControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_sop()
    {
        $user = User::factory()->create();
        $department = Department::factory()->create();
        
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/sops', [
                'title' => 'Test SOP',
                'department_id' => $department->id,
                'effective_date' => '2026-03-01'
            ]);
        
        $response->assertStatus(201)
            ->assertJsonStructure(['success', 'data' => ['id', 'title']]);
        
        $this->assertDatabaseHas('documents', [
            'title' => 'Test SOP',
            'document_type' => 'sop'
        ]);
    }
}
```

---

### 7.2 Frontend Testing (React)

[TBD - Document Jest, React Testing Library, E2E with Cypress/Playwright]

---

## 8. Performance Optimization

### 8.1 Database Indexing

**Strategy**:
- Primary keys (automatic)
- Foreign keys (for join performance)
- Frequently filtered columns (status, department_id, created_at)
- Full-text indexes for search (title, description)
- Composite indexes for common query patterns

**Example**:
```sql
CREATE INDEX idx_documents_status_dept ON documents (status, department_id);
CREATE FULLTEXT INDEX idx_documents_search ON documents (title, description);
```

---

### 8.2 Caching Strategy

[TBD - Redis caching for frequent queries, cache invalidation strategy]

---

### 8.3 Frontend Performance

**Code Splitting** (React.lazy):
```jsx
import { lazy, Suspense } from 'react';

const SopsPage = lazy(() => import('./pages/documents/SopsPage'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <SopsPage />
    </Suspense>
  );
}
```

**Pagination**: Server-side pagination for large datasets (per API Contract)

---

## 9. Deployment Architecture

### 9.1 Environment Configuration

**Development**:
- Frontend: Vite dev server (port 5173)
- Backend: Laravel Artisan serve (port 8000)
- Database: Local MySQL

**Production** (per AGENTS.md Section 2):
- **Hosting**: Laravel Forge, Heroku, or DigitalOcean
- **Database**: Managed MySQL (AWS RDS or DigitalOcean Managed Database)
- **CDN**: Cloudflare for static assets
- **File Storage**: AWS S3 or DigitalOcean Spaces

---

### 9.2 CI/CD Pipeline

[TBD - Document GitHub Actions workflow for automated testing + deployment]

---

## 10. Acceptance Criteria

- [ ] All architectural decisions documented with rationale
- [ ] Implementation patterns documented for approval workflow, versioning, file upload, queues
- [ ] Laravel backend patterns align with best practices (controllers, services, policies, jobs)
- [ ] React frontend patterns align with modern React (hooks, context, functional components)
- [ ] Security patterns address OWASP Top 10 vulnerabilities
- [ ] Testing strategy covers unit, integration, E2E tests
- [ ] Performance optimization strategy documented (indexing, caching, code splitting)
- [ ] Deployment architecture defined
- [ ] Backend lead and frontend lead approve TDD-Lite

---

## 11. Open Questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
| OQ-04 | Performance benchmarks in TDD-Lite? (Page load <2s, API response <500ms?) | Backend Lead | [TBD] |
| TDD-01 | Use Redis for caching or defer to Phase 2? | DevOps | [TBD] |
| TDD-02 | CI/CD tool: GitHub Actions, GitLab CI, or Jenkins? | DevOps | [TBD] |
| TDD-03 | Frontend state management: React Context sufficient or use Redux? | Frontend Lead | [TBD] |
| TDD-04 | Document inheritance: STI confirmed or switch to separate tables? | Database Architect | [TBD - relates to ERD-01] |
| TDD-05 | Virus scanning: ClamAV self-hosted or VirusTotal API? | Security Lead | [TBD] |

---

**Document Status**: 🟡 TEMPLATE - Awaiting content population  
**Next Steps**: Review template structure, resolve open questions, populate implementation details  
**Estimated Completion**: [TBD based on FSD, ERD, API Contract, UI Wireframes completion]
