# Quick Asset Update Guide

## When Template Assets Change

If you've made changes to files in `D:\Difan-DIOS\template\assets\`, follow these steps:

### Option 1: Run the Script (Recommended)
```powershell
cd D:\Difan-DIOS\frontend
.\copy-template-assets.ps1
```

### Option 2: Quick Manual Copy
```powershell
cd D:\Difan-DIOS\frontend
Remove-Item -Path .\public\assets -Recurse -Force
Copy-Item -Path ..\template\assets -Destination .\public\assets -Recurse
```

### Option 3: Use Symbolic Link (Admin Required)
Run PowerShell as Administrator:
```powershell
cd D:\Difan-DIOS\frontend
Remove-Item -Path .\public\assets -Recurse -Force
New-Item -ItemType SymbolicLink -Path .\public\assets -Target (Resolve-Path ..\template\assets)
```

With a symbolic link, changes to template assets are automatically reflected!

## Verify Assets Are Loaded

1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Open DevTools → Network tab
4. Check that assets load from `/assets/css/style.css`, `/assets/img/logo.svg`, etc.

## Asset Path Reference

Template assets are available at these paths in your React app:

| Asset Type | Path |
|------------|------|
| CSS | `/assets/css/style.css` |
| JS | `/assets/js/script.js` |
| Images | `/assets/img/...` |
| Fonts | `/assets/fonts/...` |
| Plugins | `/assets/plugins/...` |

## Using in React Components

```jsx
// Example: Using template image
<img src="/assets/img/logo.svg" alt="Logo" />

// Example: Using FontAwesome icon (loaded via template CSS)
<i className="fas fa-user"></i>

// Example: Using template CSS classes
<div className="page-wrapper">
  <div className="content">
    {/* Your content */}
  </div>
</div>
```

## Troubleshooting

### Assets not found (404)?
- Run `copy-template-assets.ps1` again
- Check `frontend/public/assets/` exists
- Clear browser cache (Ctrl+Shift+R)
- Restart dev server

### Styles not applying?
- Check browser console for CSS errors
- Verify template CSS is loaded in `index.html`
- Ensure no CSS conflicts in `App.css`

### Images broken?  
- Check file path case-sensitivity
- Verify image exists in `template/assets/img/`
- Re-run asset sync script
