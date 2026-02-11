import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="header">
      <div className="main-header">
        {/* Logo */}
        <div className="header-left active">
          <Link to="/dashboard" className="logo logo-normal">
            <span className="fs-4 fw-bold text-primary">DIOS</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile_btn"
          className="mobile_btn btn btn-link"
          onClick={toggleSidebar}
        >
          <span className="bar-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          <li className="nav-item nav-searchinputs">
            <div className="top-nav-search">
              <form onSubmit={handleSearch} className="dropdown">
                <div className="searchinputs">
                  <input
                    type="text"
                    placeholder="Cari..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="search-addon">
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-bell"></i>
              <span className="badge rounded-pill bg-danger">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifikasi</span>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link to="/sop">
                      <div className="d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <i className="fa fa-file-alt"></i>
                        </span>
                        <div className="flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">SOP Baru</span> telah dibuat
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">5 menit yang lalu</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link to="/notifications">Lihat semua notifikasi</Link>
              </div>
            </div>
          </li>

          {/* User Profile */}
          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="#"
              className="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter bg-primary text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </span>
              <span className="user-detail">
                <span className="user-name">{user?.name || 'User'}</span>
                <span className="user-role">
                  {user?.role || 'Staff'}
                </span>
              </span>
            </a>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <Link className="dropdown-item" to="/profile">
                  <i className="fa fa-user me-2"></i> Profil Saya
                </Link>
                <Link className="dropdown-item" to="/settings">
                  <i className="fa fa-cog me-2"></i> Pengaturan
                </Link>
                <hr className="m-0" />
                <button className="dropdown-item" onClick={logout}>
                  <i className="fa fa-sign-out-alt me-2"></i> Keluar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
