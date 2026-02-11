import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'fa-home',
      path: '/dashboard',
    },
    {
      title: 'Manajemen Dokumen',
      icon: 'fa-folder',
      submenu: [
        { title: 'SOP', path: '/sop' },
        { title: 'Kebijakan', path: '/kebijakan' },
        { title: 'Instruksi Kerja', path: '/instruksi-kerja' },
        { title: 'Manual Mutu', path: '/manual-mutu' },
        { title: 'Panduan Aplikasi', path: '/panduan-aplikasi' },
      ],
    },
    {
      title: 'Work Order',
      icon: 'fa-tasks',
      path: '/work-order',
    },
    {
      title: 'Ruang Meeting',
      icon: 'fa-calendar',
      submenu: [
        { title: 'Booking', path: '/booking-meeting-room' },
        { title: 'Kalender', path: '/kalender-ruang-meeting' },
      ],
    },
    {
      title: 'Organisasi',
      icon: 'fa-sitemap',
      submenu: [
        { title: 'Struktur Organisasi', path: '/struktur-organisasi' },
        { title: 'Job Description', path: '/jobdesk' },
      ],
    },
    {
      title: 'Request Customer',
      icon: 'fa-user-tie',
      path: '/request-customer',
    },
    {
      title: 'Form',
      icon: 'fa-file-alt',
      path: '/form',
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? '' : 'hide-sidebar'}`} id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={item.submenu ? 'submenu' : ''}>
                {item.submenu ? (
                  <>
                    <a href="#" className="subdrop">
                      <i className={`fa ${item.icon}`}></i>
                      <span>{item.title}</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul>
                      {item.submenu.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                          >
                            {sub.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <i className={`fa ${item.icon}`}></i>
                    <span>{item.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
