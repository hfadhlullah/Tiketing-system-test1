# DIOS Frontend - React Application

Frontend application for Difan Integrated Operational System (DIOS) built with React.js, React Router, and React Bootstrap.

## 🚀 Tech Stack

- **React** 19.2.0 - UI library
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI components
- **Bootstrap** 5.x - CSS framework
- **Axios** - API communication
- **FontAwesome** - Icons
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   └── Layout/         # Layout components (Header, Sidebar)
│   ├── context/            # React Context providers
│   │   └── AuthContext.jsx # Authentication context
│   ├── layouts/            # Page layouts
│   │   └── MainLayout.jsx  # Main application layout
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── SOP/           # SOP management pages
│   │   ├── Policy/        # Policy pages
│   │   ├── WorkOrder/     # Work order pages
│   │   ├── MeetingRoom/   # Meeting room booking
│   │   └── ...
│   ├── services/          # API services
│   │   └── api.js         # Axios instance with interceptors
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component with routes
│   ├── main.jsx           # Application entry point
│   ├── App.css            # App-specific styles
│   └── index.css          # Global styles
├── public/                # Static assets
├── .env.example           # Environment variables template
├── index.html            # HTML template
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 22.8.0 or higher
- npm 10.8.2 or higher

### Installation Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file:**
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses token-based authentication:
- Login credentials are sent to `/api/login`
- JWT token is stored in `localStorage`
- Token is automatically attached to all API requests
- Auto-logout on 401 responses

## 🗺️ Routes

### Public Routes
- `/login` - Login page

### Protected Routes (requires authentication)
- `/dashboard` - Main dashboard
- `/sop` - SOP list
- `/sop/add` - Add new SOP
- `/sop/edit/:id` - Edit SOP
- `/kebijakan` - Policy management
- `/instruksi-kerja` - Work instructions
- `/manual-mutu` - Quality manual
- `/panduan-aplikasi` - Application guide
- `/work-order` - Work order list
- `/work-order/add` - Add work order
- `/booking-meeting-room` - Meeting room booking
- `/kalender-ruang-meeting` - Meeting room calendar
- `/jobdesk` - Job descriptions
- `/struktur-organisasi` - Organizational structure
- `/request-customer` - Customer requests
- `/form` - Forms

## 🎨 Styling

The application uses:
- **Bootstrap 5** - Base CSS framework
- **React Bootstrap** - React components
- **FontAwesome** - Icon library
- **Custom CSS** - Additional styling in `index.css` and `App.css`

### Color Scheme
- Primary: `#0d6efd` (Blue)
- Success: `#198754` (Green)
- Danger: `#dc3545` (Red)
- Warning: `#ffc107` (Yellow)
- Info: `#0dcaf0` (Cyan)

## 📋 Features Implemented

### ✅ Completed
- [x] Authentication system with JWT
- [x] Protected routes
- [x] Main layout with header and sidebar
- [x] Dashboard with statistics
- [x] SOP management (list, add, edit)
- [x] Navigation menu with submenu support
- [x] Responsive design
- [x] API service with interceptors
- [x] Loading states
- [x] Error handling

### 🚧 In Progress / Placeholder
- [ ] Policy management (placeholder)
- [ ] Work instructions (placeholder)
- [ ] Quality manual (placeholder)
- [ ] Application guide (placeholder)
- [ ] Work order management (placeholder)
- [ ] Meeting room booking (placeholder)
- [ ] Job descriptions (placeholder)
- [ ] Organizational structure (placeholder)
- [ ] Customer requests (placeholder)
- [ ] Form management (placeholder)

## 🔌 API Integration

The application expects a Laravel backend at `http://localhost:8000/api` with the following endpoints:

### Authentication
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /user` - Get current user

### SOP Management
- `GET /sops` - List all SOPs
- `POST /sops` - Create new SOP
- `GET /sops/{id}` - Get SOP details
- `PUT /sops/{id}` - Update SOP
- `DELETE /sops/{id}` - Delete SOP

*(Other module endpoints to be implemented)*

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Run `npm install` to ensure all dependencies are installed

2. **API connection errors**
   - Check `.env` file has correct `VITE_API_URL`
   - Ensure backend server is running

3. **Port already in use**
   - Change port in `vite.config.js` or kill the process using the port

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Vite Documentation](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)

## 👥 Development Team

- **Project**: Difan-DIOS
- **Author**: Kiswandi
- **Tech Stack**: React + Vite + Bootstrap

---

**Note**: This frontend is designed to work with the Laravel backend in the `backend/` directory.

