# Template Integration Guide

## Overview
This React frontend is integrated with the HTML templates located in `../template/`.

## Asset Management

### Option 1: Symbolic Link (Recommended)
Run PowerShell **as Administrator**:
```powershell
cd D:\Difan-DIOS\frontend
.\copy-template-assets.ps1
```

This creates a symbolic link, so any changes to template assets automatically reflect in the frontend.

### Option 2: Copy Assets (Without Admin Rights)
Run PowerShell normally:
```powershell
cd D:\Difan-DIOS\frontend
.\copy-template-assets.ps1
```

This copies assets. Re-run the script whenever template assets change.

### Option 3: Manual Copy
```powershell
Copy-Item -Path ..\template\assets -Destination .\public\assets -Recurse -Force
```

## Asset Paths in Vite Config

The `vite.config.js` includes path aliases:
- `@` → `./src`
- `@template` → `../template`
- `@assets` → `../template/assets`

## Using Template Assets in React Components

### CSS Classes
All Bootstrap and custom CSS classes from the template are available:
```jsx
<div className="main-wrapper">
  <div className="header">
    <div className="logo">
      <img src="/assets/img/logo.svg" alt="Logo" />
    </div>
  </div>
</div>
```

### Images
```jsx
<img src="/assets/img/avatar/avatar-01.jpg" alt="User" />
```

### Icons (FontAwesome)
```jsx
<i className="fas fa-home"></i>
<i className="ti ti-user"></i>
```

## Template Structure Reference

```
template/
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── style.css
│   │   └── ...
│   ├── js/
│   │   ├── jquery-3.7.1.min.js
│   │   ├── bootstrap.bundle.min.js
│   │   └── ...
│   ├── img/
│   ├── fonts/
│   └── plugins/
│       ├── fontawesome/
│       ├── select2/
│       ├── quill/
│       └── ...
└── [page].html templates
```

## Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Update Template Assets**:
   - If using symbolic link: Changes auto-reflect
   - If using copy: Re-run `copy-template-assets.ps1`

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Notes

- Template HTML files are reference only
- React components implement the UI structure
- Template CSS/JS/assets are used as-is
- Backend API: `http://localhost:8000`
- Frontend Dev: `http://localhost:3000`

## Troubleshooting

### Assets not loading?
1. Check `frontend/public/assets/` exists
2. Run `copy-template-assets.ps1`
3. Clear browser cache
4. Restart dev server

### CSS conflicts?
Template CSS is loaded first in `index.html`, React styles override when needed.

### Missing icons?
Ensure FontAwesome and Tabler Icons CSS are in `public/assets/plugins/`
