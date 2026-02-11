# UI Wireframes

## Document Information

|                        |                                |
|------------------------|--------------------------------|
| **Project**            | Difan-DIOS (Difan Integrated Operational System) |
| **Version**            | 1.0.0 (DRAFT - TEMPLATE)       |
| **Date**               | February 10, 2026              |
| **Status**             | 🟡 Template - Awaiting Content |
| **Author**             | TBD                            |
| **Reviewers**          | Frontend Lead, UX Designer, Product Owner |
| **Dependencies**       | FSD, ERD, API Contract complete |
| **Wireframe Format**   | ASCII diagrams + Markdown [TBD - OQ-03: Mermaid, Excalidraw?] |

---

## 1. Introduction

### 1.1 Purpose
<!-- Describe the purpose of this document: to define screen layouts, navigation flows, and component specifications for Difan-DIOS MVP 1 -->

### 1.2 Scope
<!-- List which screens/modules are wireframed (authentication, dashboard, documents, work orders, bookings, etc.) -->

### 1.3 Wireframe Conventions
- **Layout**: ASCII art diagrams showing component placement
- **Components**: Bootstrap 5-based components (referenced from existing templates)
- **Responsive**: Design for desktop (≥1024px), tablet (768-1023px), mobile (<768px)
- **Interactions**: Documented separately (click, hover, keyboard navigation)

### 1.4 Reference Documents
- FSD: `prompter/difan-dios/fsd.md`
- ERD: `prompter/difan-dios/erd.md`
- API Contract: `prompter/difan-dios/api-contract.md`
- Existing Templates: `template/*.html`

### 1.5 Design System
- **CSS Framework**: Bootstrap 5.x
- **Icons**: FontAwesome, Tabler Icons, Feather Icons
- **Components**: DataTables, Select2, Quill Editor, FullCalendar, SweetAlert2

---

## 2. Global Layout

### 2.1 Master Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ Header                                                        │
│ ┌──────┐  ┌─────────────┐  ┌──────┐ ┌──────┐ ┌────────────┐ │
│ │ Logo │  │ Global Search│  │  🔔  │ │  ⚙️  │ │ User Avatar│ │
│ └──────┘  └─────────────┘  └──────┘ └──────┘ └────────────┘ │
├──────────┬───────────────────────────────────────────────────┤
│          │ Breadcrumb: Home > Documents > SOPs               │
│ Sidebar  ├───────────────────────────────────────────────────┤
│          │ Page Title                    [Action Buttons]    │
│ ┌──────┐ ├───────────────────────────────────────────────────┤
│ │ Home │ │                                                   │
│ │ Docs │ │                                                   │
│ │ SOPs │ │           Main Content Area                       │
│ │ Work │ │                                                   │
│ │ Book │ │                                                   │
│ │ ...  │ │                                                   │
│ └──────┘ │                                                   │
│          │                                                   │
│ (Collap- │                                                   │
│  sible)  │                                                   │
│          ├───────────────────────────────────────────────────┤
│          │ Pagination (if applicable)                        │
└──────────┴───────────────────────────────────────────────────┘
```

**Components**:
- **Header**: Fixed top, height 60px, contains logo, search, notifications, settings, profile dropdown
- **Sidebar**: Fixed left, width 240px (collapsible to 60px icon-only on tablet/mobile)
- **Main Content**: Right of sidebar, full height, scrollable, padding 24px

**Responsive Behavior**:
- **Desktop (≥1024px)**: Sidebar visible by default
- **Tablet (768-1023px)**: Sidebar collapsed to icons, expands on hover/click
- **Mobile (<768px)**: Sidebar hidden, toggle button in header

---

### 2.2 Header Components

#### 2.2.1 Logo
- Position: Top-left
- Size: 120px × 40px
- Link: Redirects to dashboard
- Responsive: Hide text on mobile, show icon only

#### 2.2.2 Global Search
- Position: Center-left
- Type: Text input with autocomplete dropdown
- Width: 400px (desktop), 200px (tablet), full-width (mobile)
- Placeholder: "Search documents, work orders, users..."
- Behavior: 
  - Show suggestions as user types (debounced, 300ms)
  - Suggestions grouped by entity type (Documents, Work Orders, Users)
  - Click suggestion navigates to detail page
  - Enter key navigates to full search results page

#### 2.2.3 Notification Bell
- Position: Right side of header
- Icon: FontAwesome bell icon
- Badge: Red number badge showing unread count
- Click behavior: Opens notification dropdown (max 5 recent, "View All" link at bottom)

#### 2.2.4 Settings Icon
- Position: Right of notifications
- Icon: Gear icon
- Click behavior: Opens settings modal or navigates to settings page
- Visible for: Admin roles only

#### 2.2.5 User Profile Dropdown
- Position: Far right
- Display: Avatar image + username
- Dropdown menu items:
  - Profile
  - Change Password
  - Logout

---

### 2.3 Sidebar Navigation

**Structure** (Role-specific - example for Admin):
```
┌───────────────────┐
│ 📊 Dashboard      │
├───────────────────┤
│ 📄 Documents      │
│   > SOPs          │
│   > Policies      │
│   > Work Instr.   │
│   > Quality Man.  │
│   > App Guides    │
├───────────────────┤
│ ✅ Approvals      │
├───────────────────┤
│ 🛠️ Work Orders    │
├───────────────────┤
│ 📅 Bookings       │
├───────────────────┤
│ 👥 Users (Admin)  │
├───────────────────┤
│ 🏢 Organization   │
│   > Structure     │
│   > Job Desks     │
├───────────────────┤
│ 📝 Requests       │
├───────────────────┤
│ ⚙️ Settings       │
└───────────────────┘
```

**Behavior**:
- Active menu item highlighted (background color)
- Expandable groups (Documents, Organization) with chevron icon
- Hover: Tooltip showing full name (when collapsed)
- Responsive: Collapse to icons only on tablet/mobile

**Permission-Based Display**:
- [TBD - Document which menu items visible per role, reference AGENTS.md Section 8]

---

## 3. Authentication Screens

### 3.1 Login Page (US-01)

**Reference Template**: `template/LOGIN_PAGE.html` [TBD - verify filename]

**Layout** (Centered card on full-page):
```
                ┌────────────────────────────┐
                │                            │
                │    Difan-DIOS Logo         │
                │                            │
                │    Quality Management      │
                │    System                  │
                │                            │
                ├────────────────────────────┤
                │                            │
                │  Username: [____________]  │
                │                            │
                │  Password: [____________]  │
                │            [Show/Hide]     │
                │                            │
                │  [ ] Remember Me           │
                │                            │
                │  [     Login     ]         │
                │                            │
                │  Forgot Password?          │
                │                            │
                └────────────────────────────┘
```

**Form Fields**:
- **Username**: Text input, required, placeholder "Enter your username"
- **Password**: Password input, required, placeholder "Enter your password", show/hide toggle
- **Remember Me**: Checkbox, optional

**Actions**:
- **Login Button**: Primary button, full-width, submits form
- **Forgot Password** Link: Navigates to password reset request page

**Validation**:
- Client-side: Required fields, minimum length
- Server-side: API `/api/auth/login`
- Error display: Red alert box above form (e.g., "Invalid username or password")

**Business Rules**:
- Account lockout message after 5 failed attempts: "Account locked. Try again in 15 minutes."
- Rate limit message: "Too many login attempts. Please try again in 1 minute."

**Responsive**:
- Desktop/Tablet: Centered card, max-width 400px
- Mobile: Full-width form, no card

---

### 3.2 Password Reset Request (US-03)

**Layout**:
```
                ┌────────────────────────────┐
                │   Forgot Your Password?    │
                │                            │
                │  Enter your email address  │
                │  and we'll send you a link │
                │  to reset your password.   │
                │                            │
                │  Email: [________________] │
                │                            │
                │  [  Send Reset Link  ]     │
                │                            │
                │  Back to Login             │
                └────────────────────────────┘
```

**Form Fields**:
- **Email**: Email input, required, validation for email format

**Actions**:
- **Send Reset Link**: Primary button
- **Back to Login**: Secondary link

**Success State**: Show success message "Reset link sent to your email" and auto-redirect to login after 5 seconds

---

### 3.3 Password Reset Confirmation (US-03 continued)

**Layout**:
```
                ┌────────────────────────────┐
                │    Reset Password          │
                │                            │
                │  New Password:             │
                │  [___________________]     │
                │  [Show/Hide]               │
                │                            │
                │  Confirm Password:         │
                │  [___________________]     │
                │                            │
                │  Password Requirements:    │
                │  ○ At least 8 characters   │
                │  ○ One uppercase letter    │
                │  ○ One lowercase letter    │
                │  ○ One number              │
                │  ○ One special character   │
                │                            │
                │  [  Reset Password  ]      │
                └────────────────────────────┘
```

**Form Fields**:
- **New Password**: Password input with strength indicator
- **Confirm Password**: Password input, must match new password

**Validation**:
- Real-time password strength indicator (weak, medium, strong)
- Client-side validation for complexity rules
- Visual checkmarks for met requirements (green ✓)

**Success State**: Show success message "Password reset successfully. Redirecting to login..." then navigate to login page

---

## 4. Dashboard (US-21)

**Reference Template**: `template/index.html`

**Layout** (Role-specific example for Admin):
```
┌──────────────────────────────────────────────────────────────┐
│ Dashboard                              [Date: Today's Date]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐      │
│ │   📊 Widget   │ │   📊 Widget   │ │   📊 Widget   │      │
│ │   Pending     │ │   Documents   │ │   Work Orders │      │
│ │   Approvals   │ │   Published   │ │   Assigned    │      │
│ │               │ │               │ │               │      │
│ │     [25]      │ │     [142]     │ │     [8]       │      │
│ │               │ │               │ │               │      │
│ │  [View All]   │ │  [View All]   │ │  [View All]   │      │
│ └───────────────┘ └───────────────┘ └───────────────┘      │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Recent Documents                        [View All]      │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Title             | Type   | Status    | Date          │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ IT Security SOP   | SOP    | Published | 2026-02-01    │ │
│ │ HR Policy Update  | Policy | Draft     | 2026-01-28    │ │
│ │ ...               | ...    | ...       | ...           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌────────────────────┐ ┌────────────────────────────────┐  │
│ │ Compliance Chart   │ │ Work Order Status Chart        │  │
│ │ (Pie/Donut Chart)  │ │ (Bar Chart)                    │  │
│ │                    │ │                                │  │
│ │  [Chart Placeholder] │ [Chart Placeholder]              │  │
│ └────────────────────┘ └────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**Widgets** (Role-specific):
- **Admin**: Pending approvals, total users, total documents, work orders assigned
- **Quality Manager**: Compliance metrics, overdue reviews, pending approvals
- **Staff**: My work orders, my bookings, recent documents
- [TBD - Define widgets per role, reference FSD FR-DASHBOARD-001]

**Widget Structure**:
- Icon + Title
- Large number (KPI value)
- "View All" link navigates to relevant module

**Tables**: Recent documents, pending approvals (max 5 rows, "View All" link)

**Charts**: 
- Compliance donut chart (conforming vs. non-conforming documents)
- Work order status bar chart (by status)
- [TBD - Chart library: ApexCharts or C3?]

**Responsive**:
- Desktop: 3-column widget grid
- Tablet: 2-column grid
- Mobile: Single column, stacked widgets

---

## 5. Document Management

### 5.1 Document List Page (SOPs Example) (US-05, US-06)

**Reference Template**: `template/sop.html`

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ SOPs                    [Add New SOP] [Export] [Import]      │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────┬──────────────┬──────────────┬──────────────┐ │
│ │ Search:    │ Status: [⬇]  │ Dept: [⬇]    │ Category[⬇] │ │
│ │ [________] │              │              │             │ │
│ └────────────┴──────────────┴──────────────┴──────────────┘ │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──┬────────────┬──────┬────────┬────────┬────────┬──────┐ │
│ │☐ │ SOP Number │Title │ Status │ Dept   │ Date   │ Act. │ │
│ ├──┼────────────┼──────┼────────┼────────┼────────┼──────┤ │
│ │☐ │SOP-2026-001│IT... │Publish │IT Dept │01/15   │[...] │ │
│ │☐ │SOP-2026-002│HR... │Draft   │HR Dept │01/20   │[...] │ │
│ │☐ │SOP-2026-003│QA... │Approva │QA Dept │02/01   │[...] │ │
│ │  │ ...        │ ...  │ ...    │ ...    │ ...    │ ...  │ │
│ └──┴────────────┴──────┴────────┴────────┴────────┴──────┘ │
│                                                              │
│ Showing 1-20 of 142        [  < ] [ 1 ] [ 2 ] [ 3 ] [ > ]  │
└──────────────────────────────────────────────────────────────┘
```

**Filters** (Top row, inline):
- **Search**: Text input, placeholder "Search by title or description", debounced search
- **Status**: Dropdown (All, Draft, Submitted, Approved, Published, Archived)
- **Department**: Dropdown (All Departments, IT, HR, QA, ...)
- **Category**: Dropdown (All Categories, Security, Operations, ...)

**Action Buttons** (Top-right):
- **Add New SOP**: Primary button, navigates to create SOP page
- **Export**: Secondary button, opens export modal (PDF, Excel)
- **Import**: Secondary button, opens import modal (upload Excel template)

**DataTable**:
- **Checkbox**: Bulk select for batch actions
- **Columns**: SOP Number, Title, Status, Department, Date (created or effective), Actions
- **Sortable**: Click column header to sort
- **Status Badge**: Color-coded (Draft=gray, Published=green, Approved=blue, Rejected=red)
- **Actions Dropdown** (`...` button):
  - View
  - Edit (if permitted)
  - Submit for Approval (if draft and permitted)
  - Archive (if published and permitted)
  - Delete (if draft and permitted)

**Pagination**: Bottom of table, items per page selector (10, 20, 50, 100)

**Responsive**:
- Desktop: Full table
- Tablet: Hide less important columns (category, department)
- Mobile: Card view instead of table (stacked rows), swipe actions

---

### 5.2 Document Create/Edit Form (SOP Example) (US-05)

**Reference Template**: `template/add-sop.html`

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ Create New SOP                   [Save Draft] [Cancel]       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Title: *                                               │  │
│ │ [________________________________________________]     │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────┬───────────────────────────────┐  │
│ │ SOP Number:            │ Category:                     │  │
│ │ [Auto-generated]       │ [Select Category ⬇]           │  │
│ └────────────────────────┴───────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────┬───────────────────────────────┐  │
│ │ Department: *          │ Effective Date: *             │  │
│ │ [Select Dept ⬇]        │ [📅 MM/DD/YYYY]               │  │
│ └────────────────────────┴───────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Description:                                           │  │
│ │ ┌────────────────────────────────────────────────────┐ │  │
│ │ │  Rich Text Editor (Quill)                          │ │  │
│ │ │  [B] [I] [U] [...formatting toolbar...]           │ │  │
│ │ │                                                    │ │  │
│ │ │  [Editor content area]                             │ │  │
│ │ │                                                    │ │  │
│ │ └────────────────────────────────────────────────────┘ │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Procedure Steps:                                       │  │
│ │ 1. [_____________________________________________]      │  │
│ │ 2. [_____________________________________________]      │  │
│ │ [+ Add Step]                                           │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ File Attachment:                                       │  │
│ │ [Choose File] or Drag & Drop                           │  │
│ │ Allowed: PDF, DOC, DOCX (Max 10MB)                     │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ [Save as Draft]  [Submit for Approval]  [Cancel]           │
└──────────────────────────────────────────────────────────────┘
```

**Form Fields**:
- **Title**: Text input, required, max 500 characters, character counter
- **SOP Number**: Read-only (auto-generated) or editable if admin
- **Category**: Select dropdown
- **Department**: Select dropdown (default: user's department)
- **Effective Date**: Date picker, required
- **Review Date**: Date picker, optional (future date)
- **Description**: Rich text editor (Quill), optional
- **Procedure Steps**: Dynamic list, add/remove steps, drag-to-reorder
- **File Attachment**: File upload dropzone, drag-and-drop, preview

**Validation**:
- Required fields marked with asterisk (*)
- Real-time validation on blur
- Error messages below field in red
- Submit button disabled until required fields valid

**Actions**:
- **Save as Draft**: Save without submitting (can edit later)
- **Submit for Approval**: Validate + save + trigger approval workflow
- **Cancel**: Confirm discard changes, navigate back to list

**Auto-save** (SOP-011 Spec Delta):
- Auto-save draft every 60 seconds
- Show "Saving..." indicator
- Show "Last saved at HH:MM" timestamp

**Responsive**:
- Desktop: 2-column layout for some fields
- Tablet/Mobile: Single-column, full-width fields

---

### 5.3 Document Detail View (US-06)

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ IT Security Policy                          [Edit] [Archive] │
│ SOP-2026-001                                                 │
├──────────────────────────────────────────────────────────────┤
│ Status: [Published] 🟢          Version: 1.2                 │
│ Department: IT Department       Effective: 2026-01-15        │
│ Created By: John Doe            Review Due: 2027-01-15       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ [Overview] [Content] [Version History] [Approvals] [Audit]  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Description:                                           │  │
│ │                                                        │  │
│ │ [Rich text content rendered here]                     │  │
│ │                                                        │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Attached Files:                                        │  │
│ │ 📄 IT_Security_Policy.pdf (2.5 MB) [Download]          │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Tabs**:
- **Overview**: Document metadata, description, attachments
- **Content**: Full document content (if stored in system)
- **Version History**: List of versions with diff view
- **Approvals**: Approval history timeline
- **Audit**: Audit trail (who viewed, edited, approved)

**Actions** (Permission-based):
- **Edit**: Navigate to edit form (if draft or has edit permission)
- **Archive**: Show confirmation modal, archive document (if published)
- **Download**: Download attached file
- **Print**: Print-friendly view

**Version History Tab**:
```
Version 1.2 (Current) - Created by John Doe on 2026-02-01
  └─ Changes: Updated security protocols
     [View] [Compare with 1.1]

Version 1.1 - Created by Jane Smith on 2025-12-15
  └─ Changes: Added network security section
     [View] [Compare with 1.0]

Version 1.0 (Initial) - Created by John Doe on 2025-06-01
     [View]
```

**Approval Timeline**:
```
✅ Level 3: Approved by Quality Manager (Jane Smith) on 2026-01-14
   Comment: "Approved with minor suggestions"

✅ Level 2: Approved by Department Head (Bob Johnson) on 2026-01-12
   Comment: "Looks good"

✅ Level 1: Approved by Reviewer (Alice Brown) on 2026-01-10
   Comment: "No issues found"

📝 Submitted by John Doe on 2026-01-09
```

---

## 6. Approval Workflow

### 6.1 Pending Approvals Dashboard (US-10, US-11)

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ Pending Approvals                  [Filter: All Types ⬇]    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──┬────────┬────────────┬──────────┬──────────┬─────────┐ │
│ │☐ │ Doc #  │ Title      │ Type     │ Submitt. │ Actions │ │
│ ├──┼────────┼────────────┼──────────┼──────────┼─────────┤ │
│ │☐ │SOP-001 │IT Sec...   │ SOP      │ John Doe │ [Review]│ │
│ │☐ │POL-010 │HR Policy..│ Policy   │ Jane Sm. │ [Review]│ │
│ │  │ ...    │ ...        │ ...      │ ...      │ ...     │ │
│ └──┴────────┴────────────┴──────────┴──────────┴─────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Filters**:
- Document type (All, SOP, Policy, Work Instruction, ...)
- Date range

**Actions**:
- **Review**: Open approval review modal

**Badge**: Pending count displayed in header or sidebar navigation

---

### 6.2 Approval Review Modal (US-11, US-12)

**Modal Layout**:
```
┌────────────────────────────────────────────────┐
│ Review Document: IT Security Policy     [  X] │
├────────────────────────────────────────────────┤
│                                                │
│ Document Preview:                              │
│ ┌────────────────────────────────────────────┐ │
│ │ [Read-only document content or PDF iframe]│ │
│ │                                            │ │
│ │                                            │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ Your Comments: (optional)                      │
│ ┌────────────────────────────────────────────┐ │
│ │ [Textarea for comments]                    │ │
│ │                                            │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│          [✅ Approve]  [❌ Reject]  [Cancel]   │
└────────────────────────────────────────────────┘
```

**Components**:
- **Document Preview**: Embedded PDF viewer or scrollable content area
- **Comments**: Textarea, optional for approve, required for reject
- **Actions**:
  - **Approve**: Confirm approval, close modal, show success message
  - **Reject**: Confirm rejection (requires comment), show success message
  - **Cancel**: Close modal without action

**Confirmation Dialog** (on Approve/Reject):
```
Are you sure you want to [approve/reject] this document?
This action cannot be undone.

[Confirm]  [Cancel]
```

---

## 7. Work Order Management

### 7.1 Work Order List (US-15,  US-16, US-17)

**Reference Template**: `template/work-order.html`

**Layout** (similar to document list, with Kanban view option):
```
┌──────────────────────────────────────────────────────────────┐
│ Work Orders              [Add Work Order]  [📋 Table] [📊 Board] │
├──────────────────────────────────────────────────────────────┤
│ Filters: [Status ⬇] [Priority ⬇] [Assigned To ⬇] [Search]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────┬──────────────┬─────────────┬─────────────┐ │
│ │ New          │ In Progress  │ Review      │ Completed   │ │
│ ├──────────────┼──────────────┼─────────────┼─────────────┤ │
│ │ ┌──────────┐ │ ┌──────────┐ │ ┌─────────┐│ ┌─────────┐│ │
│ │ │WO-001    │ │ │WO-005    │ │ │WO-010   ││ │WO-020   ││ │
│ │ │🔴 Critical│ │ │🟡 Medium│ │ │🟢 Low   ││ │🟢 Low   ││ │
│ │ │Fix Server│ │ │Update... │ │ │Test...  ││ │Deploy..│││ │
│ │ │Assigned: │ │ │Assigned: │ │ │Assigned:││ │Assigned:││ │
│ │ │  John    │ │ │  Jane    │ │ │  Bob    ││ │ Alice   ││ │
│ │ └──────────┘ │ └──────────┘ │ └─────────┘│ └─────────┘│ │
│ │ ┌──────────┐ │ ┌──────────┐ │             │             │ │
│ │ │WO-002    │ │ │WO-006    │ │             │             │ │
│ │ │🟡 High   │ │ │🟡 Medium │ │             │             │ │
│ │ │...       │ │ │...       │ │             │             │ │
│ │ └──────────┘ │ └──────────┘ │             │             │ │
│ └──────────────┴──────────────┴─────────────┴─────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**View Toggle**:
- **Table View**: DataTable (similar to document list)
- **Kanban Board**: Drag-and-drop cards between status columns

**Priority Indicators**:
- 🔴 Critical (red)
- 🟠 High (orange)
- 🟡 Medium (yellow)
- 🟢 Low (green)

**Kanban Card** (Click to view details):
- WO number
- Priority badge
- Title (truncated)
- Assigned user avatar + name
- Due date (if overdue, show in red)

---

### 7.2 Work Order Create/Edit Form (US-15)

**Reference Template**: `template/add-work-order.html`

**Layout** (similar to document form, simpler fields):
```
┌──────────────────────────────────────────────────────────────┐
│ Create New Work Order                    [Save] [Cancel]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Title: * [____________________________________________]       │
│                                                              │
│ Description:                                                 │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ [Textarea for description]                             │  │
│ │                                                        │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────┬───────────────┬──────────────────┐  │
│ │ Priority: *        │ Assigned To:  │ Due Date:        │  │
│ │ [Select ⬇]         │ [Select ⬇]    │ [📅 Date Picker]│  │
│ └────────────────────┴───────────────┴──────────────────┘  │
│                                                              │
│ Attachments:                                                 │
│ [Upload Files]                                               │
│                                                              │
│ [Save] [Cancel]                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 7.3 Work Order Detail Page (US-17)

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ WO-001: Fix Server Issues              [Edit] [Close] [...]  │
│ Status: In Progress 🟡    Priority: Critical 🔴               │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────┬─────────────────────────────────────┐  │
│ │ Created By:      │ John Doe                            │  │
│ │ Assigned To:     │ Jane Smith                          │  │
│ │ Department:      │ IT Department                       │  │
│ │ Created:         │ 2026-02-01                          │  │
│ │ Due Date:        │ 2026-02-05 ⚠️ (2 days remaining)   │  │
│ └──────────────────┴─────────────────────────────────────┘  │
│                                                              │
│ Description:                                                 │
│ [Work order description text]                                │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Status History:                                              │
│ ○─────○─────●─────○─────○  (Timeline visualization)         │
│ New   Assign  Progress  Review  Complete                     │
│                                                              │
│ ○ Created by John Doe on 2026-02-01 10:30                   │
│ ○ Assigned to Jane Smith on 2026-02-01 11:00                │
│ ● Status changed to "In Progress" on 2026-02-02 09:15       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Comments:                                                    │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Jane Smith - 2026-02-02 14:30                          │  │
│ │ "Started investigating the server logs..."             │  │
│ └────────────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Add Comment: [_____________________________]  [Post]   │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ Attachments:                                                 │
│ 📄 server_logs.txt [Download]                                │
│                                                              │
│ Actions:                                                     │
│ [Update Status ⬇] [Reassign] [Cancel WO]                    │
└──────────────────────────────────────────────────────────────┘
```

**Status Timeline**: Visual progress indicator showing current stage

**Update Status Dropdown**:
- On Hold
- In Progress
- Review
- Completed
- (Shows confirmation dialog if changing to Completed)

---

## 8. Meeting Room Booking

### 8.1 Room Calendar View (US-18, US-19)

**Reference Template**: `template/kalender-ruang-meeting.html`, `template/booking-meeting-room.html`

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ Meeting Room Bookings             [Book Room] [My Bookings]  │
├──────────────────────────────────────────────────────────────┤
│ Room: [All Rooms ⬇]                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [ February 2026 ]         [Month] [Week] [Day] [List]      │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ SUN  MON  TUE  WED  THU  FRI  SAT                        │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ ...  ...  ...   4    5    6    7                         │ │
│ │  8 9    10   11   12   13   14                           │ │
│ │     ┌─────────────┐                                      │ │
│ │     │10:00-11:00  │ (Booking on Feb 10)                  │ │
│ │     │Meeting A    │                                      │ │
│ │     └─────────────┘                                      │ │
│ │ ...  ...  ...  ...  ...  ...  ...                        │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Click time slot to create booking                            │
└──────────────────────────────────────────────────────────────┘
```

**Calendar** (FullCalendar library):
- **Views**: Month, Week, Day, List
- **Room Filter**: Dropdown to filter by specific room or show all
- **Bookings**: Displayed as colored blocks on calendar
- **Click Empty Slot**: Open booking creation modal
- **Click Existing Booking**: Open booking detail modal (view/edit/cancel if permitted)

**Color Coding**:
- Own bookings: Blue
- Others' bookings: Gray (or different colors per room)
- Conflicting bookings: Red outline (during creation)

---

### 8.2 Booking Creation Modal (US-19)

**Modal Layout**:
```
┌────────────────────────────────────────────────┐
│ Book Meeting Room                        [  X] │
├────────────────────────────────────────────────┤
│                                                │
│ Room: * [Select Room ⬇]                       │
│                                                │
│ Meeting Title: * [________________________]   │
│                                                │
│ Date: * [📅 02/10/2026]                       │
│                                                │
│ Start Time: * [⏰ 10:00 ⬇]                    │
│                                                │
│ End Time: * [⏰ 11:00 ⬇]                      │
│                                                │
│ Attendees Count: [____]                        │
│                                                │
│ Description:                                   │
│ ┌────────────────────────────────────────────┐ │
│ │ [Textarea]                                 │ │
│ │                                            │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ⚠️ Conflict Check: Room is available          │
│                                                │
│         [Create Booking]  [Cancel]             │
└────────────────────────────────────────────────┘
```

**Real-Time Conflict Check**:
- As user selects room + time, check availability via API
- Show green ✅ "Room is available" or red ⚠️ "Room is already booked for this time"
- Disable Create button if conflict exists

**Time Picker**: Dropdown with 30-minute intervals (08:00, 08:30, 09:00, ...)

---

### 8.3 My Bookings List (US-20)

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ My Bookings                                [Filter: All ⬇]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──┬──────────┬──────────┬──────────┬──────────┬─────────┐ │
│ │☐ │ Room     │ Meeting  │ Date     │ Time     │ Actions │ │
│ ├──┼──────────┼──────────┼──────────┼──────────┼─────────┤ │
│ │☐ │ Conf A   │ Daily... │ 02/10    │10:00-11:00│ [Edit] │ │
│ │☐ │ Board Rm │ Review...│ 02/12    │14:00-15:30│ [Cancel]│ │
│ │  │ ...      │ ...      │ ...      │ ...      │ ...     │ │
│ └──┴──────────┴──────────┴──────────┴──────────┴─────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Filter**: Upcoming, Past, All

**Actions**:
- **Edit**: Open edit modal (if booking not yet started or within edit window)
- **Cancel**: Confirm cancellation (if within cancellation deadline)

---

## 9. Search & Filtering

### 9.1 Global Search Results Page

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ Search Results for: "security policy"        [142 results]   │
├──────────────────────────────────────────────────────────────┤
│ [All Results] [Documents] [Work Orders] [Users] [Bookings]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Documents (85)                                               │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ SOP-2026-001: IT Security Policy                       │  │
│ │ Type: SOP | Department: IT | Published: 2026-01-15     │  │
│ │ ...matches "security policy" in title and description  │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ POL-2025-042: Data Security Guidelines                 │  │
│ │ Type: Policy | Department: IT | Published: 2025-11-20  │  │
│ │ ...matches "security" in title                         │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ Work Orders (12)                                             │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ WO-2026-015: Security Audit Review                     │  │
│ │ Status: In Progress | Priority: High                   │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ [Load More]                                                  │
└──────────────────────────────────────────────────────────────┘
```

**Tabs**: Filter by entity type

**Result Cards**: Show snippet with search term highlighted

**Sorting**: Relevance (default), Date (newest/oldest)

---

## 10. Settings & Administration

### 10.1 User Management (Admin)

**Layout**: DataTable with user list (similar to document list)

**Actions**: Add User, Edit User, Deactivate User, Assign Role

**Fields**: Username, Email, Full Name, Role, Department, Status, Last Login

---

### 10.2 User Profile Page

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│ My Profile                                       [Edit]      │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────┬────────────────────────────────────────────┐ │
│ │            │  Name: John Doe                           │ │
│ │  [Avatar]  │  Email: john.doe@company.com              │ │
│ │            │  Username: johndoe                        │ │
│ │            │  Role: Quality Manager                    │ │
│ │            │  Department: IT Department                │ │
│ └────────────┴────────────────────────────────────────────┘ │
│                                                              │
│ [Change Password]                                            │
│                                                              │
│ Notification Preferences:                                    │
│ ☑ Email notifications for approval requests                 │
│ ☑ Email notifications for work order assignments            │
│ ☐ Daily digest of activity                                  │
│                                                              │
│ [Save Preferences]                                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 11. Responsive Patterns

### 11.1 Breakpoints
- **Desktop**: ≥1024px
- **Tablet**: 768px - 1023px
- **Mobile**: <768px

### 11.2 Mobile Navigation
- Sidebar hidden, toggle via hamburger menu in header
- Bottom navigation bar for primary actions (Dashboard, Documents, Work Orders, Profile)

### 11.3 Mobile Tables
- Switch to card view (stacked rows)
- Swipe gestures for actions
- Horizontal scroll for complex tables

### 11.4 Mobile Forms
- Single-column layout
- Larger touch targets (min 44px height)
- Full-width buttons

---

## 12. Component Specifications

### 12.1 Buttons
- **Primary**: Blue background, white text (e.g., "Save", "Submit")
- **Secondary**: White background, blue border (e.g., "Cancel", "Export")
- **Danger**: Red background, white text (e.g., "Delete", "Reject")
- **Sizes**: Small (32px), Medium (40px), Large (48px)

### 12.2 Form Inputs
- **Text**: Border, focus state with blue outline
- **Select**: Dropdown with chevron icon, Select2 for searchable selects
- **Date Picker**: Calendar popup (Bootstrap DateTimePicker)
- **File Upload**: Dropzone with drag-and-drop

### 12.3 Status Badges
- **Draft**: Gray badge
- **Published**: Green badge
- **Approved**: Blue badge
- **Rejected**: Red badge
- **Archived**: Dark gray badge

### 12.4 Modals
- Centered overlay
- Max-width 600px (small), 800px (medium), 1000px (large)
- Backdrop click or ESC key to close
- Header with title + close button, body, footer with actions

### 12.5 Notifications (Toast)
- Bottom-right position
- Auto-dismiss after 5 seconds
- Types: Success (green), Error (red), Warning (yellow), Info (blue)
- Action buttons (e.g., "Undo", "View")

---

## 13. User Interaction Patterns

### 13.1 Loading States
- **Page Load**: Full-page spinner overlay
- **Table Load**: Skeleton rows (shimmer effect)
- **Button Action**: Button disabled, spinner icon inside button text

### 13.2 Empty States
- Illustration + message (e.g., "No documents found. Create your first SOP!")
- Call-to-action button ("Create SOP")

### 13.3 Error States
- Form validation errors: Red text below field
- API errors: Alert box at top of page or modal
- 404 Page: Centered message "Page not found" + link to dashboard

### 13.4 Confirmation Dialogs
- For destructive actions (delete, reject)
- SweetAlert2 modal with warning icon
- "Are you sure?" message, "Confirm" + "Cancel" buttons

---

## 14. Accessibility

### 14.1 Keyboard Navigation
- Tab through all interactive elements
- Enter key activates buttons/links
- ESC key closes modals
- Arrow keys navigate menus

### 14.2 Screen Reader Support
- ARIA labels on icons (e.g., `aria-label="Notifications"`)
- ARIA live regions for dynamic content (toast notifications)
- Skip navigation link (skip to main content)

### 14.3 Color Contrast
- Minimum 4.5:1 for text
- 3:1 for UI components
- Don't rely on color alone (use icons + text for status)

---

## 15. Acceptance Criteria

- [ ] All 25 PRD user stories have corresponding screen wireframes
- [ ] All API Contract endpoints have UI representation (forms for POST/PUT, tables for GET)
- [ ] Responsive behavior documented for desktop, tablet, mobile
- [ ] Component patterns specified and reusable
- [ ] Wire frames align with existing templates in `template/` directory
- [ ] Navigation flows complete (can navigate from login → dashboard → modules → detail → back)
- [ ] Frontend lead approves wireframes for React implementation

---

## 16. Open Questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
| OQ-03 | Wireframe format: ASCII only or add Mermaid diagrams/Excalidraw exports? | Frontend Lead | [TBD] |
| UI-01 | Multi-role dashboard: Show all widgets or role-specific only? | Product Owner | [TBD] |
| UI-02 | Mobile navigation: Bottom bar or slide-out sidebar? | UX Designer | [TBD] |
| UI-03 | Document preview in approval modal: Embedded PDF or external link? | Frontend Lead | [TBD] |

---

**Document Status**: 🟡 TEMPLATE - Awaiting content population  
**Next Steps**: Review template structure, resolve open questions, create detailed wireframes for all screens  
**Estimated Completion**: [TBD based on FSD, ERD, API Contract completion]
