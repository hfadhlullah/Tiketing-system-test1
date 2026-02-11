import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
        'Main': true,
        'Pengajuan': true,
        'DocumentControl': true,
        'IT': false,
        'GeneralAffair': false,
        'DocControlNested': false
    });

    const toggleSubmenu = (key: string) => {
        setOpenSubmenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-logo">
                <Link to="/" className="logo logo-normal">
                    <img src="/assets/img/logo.svg" alt="Img" />
                </Link>
                <Link to="/" className="logo logo-white">
                    <img src="/assets/img/logo-white.svg" alt="Img" />
                </Link>
                <Link to="/" className="logo-small">
                    <img src="/assets/img/logo-small.png" alt="Img" />
                </Link>
                <a id="toggle_btn" href="#">
                    <i data-feather="chevrons-left" className="feather-16"></i>
                </a>
            </div>
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className={openSubmenus['Main'] ? "submenu-open" : ""}>
                            <h6 className="submenu-hdr" onClick={() => toggleSubmenu('Main')}>Main</h6>
                            <ul>
                                <li>
                                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                                        <i className="ti ti-layout-grid fs-16 me-2"></i><span>Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={openSubmenus['Pengajuan'] ? "submenu-open" : ""}>
                            <h6 className="submenu-hdr" onClick={() => toggleSubmenu('Pengajuan')}>Pengajuan</h6>
                            <ul>
                                <li className="submenu">
                                    <a href="#" className={openSubmenus['IT'] ? "subdrop" : ""} onClick={(e) => { e.preventDefault(); toggleSubmenu('IT'); }}>
                                        <i className="ti ti-calendar fs-16 me-2"></i><span>IT</span><span className="menu-arrow"></span>
                                    </a>
                                    <ul style={{ display: openSubmenus['IT'] ? 'block' : 'none' }}>
                                        <li><Link to="/work-order">Work Order IT</Link></li>
                                    </ul>
                                </li>
                                <li className="submenu">
                                    <a href="#" className={openSubmenus['GeneralAffair'] ? "subdrop" : ""} onClick={(e) => { e.preventDefault(); toggleSubmenu('GeneralAffair'); }}>
                                        <i className="ti ti-calendar fs-16 me-2"></i><span>General Affair</span><span className="menu-arrow"></span>
                                    </a>
                                    <ul style={{ display: openSubmenus['GeneralAffair'] ? 'block' : 'none' }}>
                                        <li><a href="#">Peminjaman Kendaraan</a></li>
                                        <li><Link to="/booking-meeting-room">Booking Ruang Meeting</Link></li>
                                        <li><a href="#">Permintaan Barang</a></li>
                                        <li><a href="#">Permintaan Perbaikan/Pemeliharaan</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className={openSubmenus['DocumentControl'] ? "submenu-open" : ""}>
                            <h6 className="submenu-hdr" onClick={() => toggleSubmenu('DocumentControl')}>Document Control</h6>
                            <ul>
                                <li className="submenu">
                                    <a href="#" className={openSubmenus['DocControlNested'] ? "subdrop" : ""} onClick={(e) => { e.preventDefault(); toggleSubmenu('DocControlNested'); }}>
                                        <i className="ti ti-user-cog fs-16 me-2"></i><span>Document Control</span><span className="menu-arrow"></span>
                                    </a>
                                    <ul style={{ display: openSubmenus['DocControlNested'] ? 'block' : 'none' }}>
                                        <li><Link to="/struktur-organisasi"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Struktur Organisasi</span></Link></li>
                                        <li><Link to="/kebijakan"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Kebijakan</span></Link></li>
                                        <li><Link to="/jobdesk"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Jobdesk</span></Link></li>
                                        <li><Link to="/sop"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>SOP</span></Link></li>
                                        <li><Link to="/instruksi-kerja"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Instruksi Kerja</span></Link></li>
                                        <li><Link to="/form"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Form</span></Link></li>
                                        <li><Link to="/manual-mutu"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Manual Mutu</span></Link></li>
                                        <li><Link to="/panduan-aplikasi"><i className="ti ti-clipboard-text fs-16 me-2"></i><span>Panduan Aplikasi</span></Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
