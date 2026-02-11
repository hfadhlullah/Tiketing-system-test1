import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SOPList from './pages/SOP/SOPList';
import AddSOP from './pages/SOP/AddSOP';
import PolicyList from './pages/Policy/PolicyList';
import WorkInstructionList from './pages/WorkInstruction/WorkInstructionList';
import QualityManualList from './pages/QualityManual/QualityManualList';
import ApplicationGuideList from './pages/ApplicationGuide/ApplicationGuideList';
import WorkOrderList from './pages/WorkOrder/WorkOrderList';
import AddWorkOrder from './pages/WorkOrder/AddWorkOrder';
import MeetingRoomBooking from './pages/MeetingRoom/MeetingRoomBooking';
import MeetingRoomCalendar from './pages/MeetingRoom/MeetingRoomCalendar';
import JobDeskList from './pages/JobDesk/JobDeskList';
import OrganizationalStructure from './pages/Organization/OrganizationalStructure';
import CustomerRequestList from './pages/CustomerRequest/CustomerRequestList';
import FormList from './pages/Form/FormList';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* SOP Management */}
        <Route path="sop" element={<SOPList />} />
        <Route path="sop/add" element={<AddSOP />} />
        <Route path="sop/edit/:id" element={<AddSOP />} />
        
        {/* Policy Management */}
        <Route path="kebijakan" element={<PolicyList />} />
        
        {/* Work Instructions */}
        <Route path="instruksi-kerja" element={<WorkInstructionList />} />
        
        {/* Quality Manual */}
        <Route path="manual-mutu" element={<QualityManualList />} />
        
        {/* Application Guide */}
        <Route path="panduan-aplikasi" element={<ApplicationGuideList />} />
        
        {/* Work Orders */}
        <Route path="work-order" element={<WorkOrderList />} />
        <Route path="work-order/add" element={<AddWorkOrder />} />
        <Route path="work-order/edit/:id" element={<AddWorkOrder />} />
        
        {/* Meeting Room */}
        <Route path="booking-meeting-room" element={<MeetingRoomBooking />} />
        <Route path="kalender-ruang-meeting" element={<MeetingRoomCalendar />} />
        
        {/* Organization */}
        <Route path="jobdesk" element={<JobDeskList />} />
        <Route path="struktur-organisasi" element={<OrganizationalStructure />} />
        
        {/* Customer Requests */}
        <Route path="request-customer" element={<CustomerRequestList />} />
        
        {/* Forms */}
        <Route path="form" element={<FormList />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
