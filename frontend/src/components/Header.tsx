import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="main-header">
                {/* Logo */}
                <div className="header-left active">
                    <Link to="/" className="logo logo-normal">
                        <img src="/assets/img/logo.svg" alt="Img" />
                    </Link>
                    <Link to="/" className="logo logo-white">
                        <img src="/assets/img/logo-white.svg" alt="Img" />
                    </Link>
                    <Link to="/" className="logo-small">
                        <img src="/assets/img/logo-small.png" alt="Img" />
                    </Link>
                </div>
                {/* /Logo */}

                <a id="mobile_btn" className="mobile_btn" href="#sidebar" onClick={(e) => {
                    e.preventDefault();
                    const wrapper = document.querySelector('.main-wrapper');
                    const overlay = document.querySelector('.sidebar-overlay');
                    const html = document.querySelector('html');

                    wrapper?.classList.toggle('slide-nav');
                    overlay?.classList.toggle('opened');
                    html?.classList.add('menu-opened');
                }}>
                    <span className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </a>

                {/* Header Menu */}
                <ul className="nav user-menu">

                    {/* Search */}
                    <li className="nav-item nav-searchinputs">
                        <div className="top-nav-search">
                            <a href="#" className="responsive-search">
                                <i className="fa fa-search"></i>
                            </a>
                            <form action="#" className="dropdown">
                                <div className="searchinputs input-group dropdown-toggle" id="dropdownMenuClickable"
                                    data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                    <input type="text" placeholder="Search" />
                                    <div className="search-addon">
                                        <span><i className="ti ti-search"></i></span>
                                    </div>
                                    <span className="input-group-text">
                                        <kbd className="d-flex align-items-center"><img src="/assets/img/icons/command.svg"
                                            alt="img" className="me-1" /></kbd>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </li>
                    {/* /Search */}

                    {/* Notifications */}
                    <li className="nav-item dropdown nav-item-box">
                        <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                            <i className="ti ti-bell"></i>
                        </a>
                        <div className="dropdown-menu notifications">
                            <div className="topnav-dropdown-header">
                                <h5 className="notification-title">Notifications</h5>
                                <a href="#" className="clear-noti">Mark all as read</a>
                            </div>
                            <div className="noti-content">
                                <ul className="notification-list">
                                    <li className="notification-message">
                                        <Link to="/activities">
                                            <div className="media d-flex">
                                                <span className="avatar flex-shrink-0">
                                                    <img alt="Img" src="/assets/img/profiles/avatar-13.jpg" />
                                                </span>
                                                <div className="flex-grow-1">
                                                    <p className="noti-details"><span className="noti-title">James Kirwin</span>
                                                        confirmed his order. Order No: #78901.Estimated delivery: 2 days
                                                    </p>
                                                    <p className="noti-time">4 mins ago</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="notification-message">
                                        <Link to="/activities">
                                            <div className="media d-flex">
                                                <span className="avatar flex-shrink-0">
                                                    <img alt="Img" src="/assets/img/profiles/avatar-03.jpg" />
                                                </span>
                                                <div className="flex-grow-1">
                                                    <p className="noti-details"><span className="noti-title">Leo Kelly</span>
                                                        cancelled his order scheduled for 17 Jan 2025</p>
                                                    <p className="noti-time">10 mins ago</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="notification-message">
                                        <Link to="/activities" className="recent-msg">
                                            <div className="media d-flex">
                                                <span className="avatar flex-shrink-0">
                                                    <img alt="Img" src="/assets/img/profiles/avatar-17.jpg" />
                                                </span>
                                                <div className="flex-grow-1">
                                                    <p className="noti-details">Payment of $50 received for Order #67890
                                                        from <span className="noti-title">Antonio Engle</span></p>
                                                    <p className="noti-time">05 mins ago</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="topnav-dropdown-footer d-flex align-items-center gap-3">
                                <a href="#" className="btn btn-secondary btn-md w-100">Cancel</a>
                                <Link to="/activities" className="btn btn-primary btn-md w-100">View all</Link>
                            </div>
                        </div>
                    </li>
                    {/* /Notifications */}

                    <li className="nav-item dropdown has-arrow main-drop profile-nav">
                        <a href="#" className="nav-link userset" data-bs-toggle="dropdown">
                            <span className="user-info p-0">
                                <span className="user-letter">
                                    <img src="/assets/img/profiles/avator1.jpg" alt="Img" className="img-fluid" />
                                </span>
                            </span>
                        </a>
                        <div className="dropdown-menu menu-drop-user">
                            <div className="profileset d-flex align-items-center">
                                <span className="user-img me-2">
                                    <img src="/assets/img/profiles/avator1.jpg" alt="Img" />
                                </span>
                                <div>
                                    <h6 className="fw-medium">Kiswandi</h6>
                                    <p>IT Supervisor</p>
                                </div>
                            </div>
                            <a className="dropdown-item" href="#">
                                <i className="ti ti-user-circle me-2"></i>Account Information
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="ti ti-file-text me-2"></i>Change Password
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="ti ti-settings-2 me-2"></i>Login Activity
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="ti ti-settings-2 me-2"></i>History
                            </a>
                            <hr className="my-2" />
                            <a className="dropdown-item logout pb-0" href="#">
                                <i className="ti ti-logout me-2"></i>Logout
                            </a>
                        </div>
                    </li>
                </ul>
                {/* /Header Menu */}

                {/* Mobile Menu */}
                <div className="dropdown mobile-user-menu">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">Account Information</a>
                        <a className="dropdown-item" href="#">Change Password</a>
                        <a className="dropdown-item" href="#">Login Activity</a>
                        <a className="dropdown-item" href="#">History</a>
                        <a className="dropdown-item" href="#">Logout</a>
                    </div>
                </div>
                {/* /Mobile Menu */}
            </div>
        </div>
    );
}

export default Header;
