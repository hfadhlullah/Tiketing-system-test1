import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DashboardLayout: React.FC = () => {
    // Function to handle overlay click - closing the sidebar
    const closeSidebar = () => {
        const wrapper = document.querySelector('.main-wrapper');
        const overlay = document.querySelector('.sidebar-overlay');
        const html = document.querySelector('html');

        wrapper?.classList.remove('slide-nav');
        overlay?.classList.remove('opened');
        html?.classList.remove('menu-opened');
    };

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
            <div className="sidebar-overlay" onClick={closeSidebar}></div>
        </div>
    );
}

export default DashboardLayout;
