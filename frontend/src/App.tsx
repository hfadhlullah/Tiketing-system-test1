import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import StrukturOrganisasi from './pages/StrukturOrganisasi';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="struktur-organisasi" element={<StrukturOrganisasi />} />
          {/* Add more routes here matching the sidebar links */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
