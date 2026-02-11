import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DashboardLayout: React.FC = () => {
    return (
        <div className="main-wrapper">
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default DashboardLayout;
