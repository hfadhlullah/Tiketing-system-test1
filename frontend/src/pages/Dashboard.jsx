import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total SOP',
      value: '45',
      icon: 'fa-file-alt',
      color: 'primary',
      link: '/sop',
    },
    {
      title: 'Work Order Aktif',
      value: '12',
      icon: 'fa-tasks',
      color: 'success',
      link: '/work-order',
    },
    {
      title: 'Pending Approval',
      value: '8',
      icon: 'fa-clock',
      color: 'warning',
      link: '/sop',
    },
    {
      title: 'Booking Hari Ini',
      value: '5',
      icon: 'fa-calendar',
      color: 'info',
      link: '/booking-meeting-room',
    },
  ];

  const recentActivities = [
    {
      title: 'SOP IT Security diperbaharui',
      user: 'Admin',
      time: '10 menit yang lalu',
      icon: 'fa-file-alt',
      color: 'primary',
    },
    {
      title: 'Work Order WO-2024-001 selesai',
      user: 'John Doe',
      time: '1 jam yang lalu',
      icon: 'fa-check-circle',
      color: 'success',
    },
    {
      title: 'Ruang Meeting A telah dibooking',
      user: 'Jane Smith',
      time: '2 jam yang lalu',
      icon: 'fa-calendar',
      color: 'info',
    },
    {
      title: 'Kebijakan HR menunggu persetujuan',
      user: 'Manager',
      time: '3 jam yang lalu',
      icon: 'fa-clock',
      color: 'warning',
    },
  ];

  return (
    <div className="page-header">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">Dashboard</h3>
          <p className="text-muted">
            Selamat datang, {user?.name || 'User'}!
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mt-4">
        {stats.map((stat, index) => (
          <Col key={index} xl={3} lg={6} md={6} sm={12} className="mb-4">
            <Link to={stat.link} className="text-decoration-none">
              <Card className="border-0 shadow-sm h-100 card-hover">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1">{stat.title}</p>
                      <h3 className="mb-0">{stat.value}</h3>
                    </div>
                    <div
                      className={`avatar avatar-lg bg-${stat.color} bg-opacity-10 rounded-circle`}
                    >
                      <i className={`fa ${stat.icon} text-${stat.color} fs-3`}></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Recent Activities */}
      <Row className="mt-4">
        <Col xl={8} lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Aktivitas Terbaru</h5>
            </Card.Header>
            <Card.Body>
              <div className="activity-timeline">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="activity-item d-flex align-items-start mb-3 pb-3 border-bottom"
                  >
                    <div
                      className={`avatar avatar-sm bg-${activity.color} bg-opacity-10 rounded-circle me-3 flex-shrink-0`}
                    >
                      <i className={`fa ${activity.icon} text-${activity.color}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-1 fw-medium">{activity.title}</p>
                      <p className="text-muted small mb-0">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col xl={4} lg={12} className="mt-xl-0 mt-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Aksi Cepat</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/sop/add" className="btn btn-primary">
                  <i className="fa fa-plus me-2"></i> Buat SOP Baru
                </Link>
                <Link to="/work-order/add" className="btn btn-success">
                  <i className="fa fa-plus me-2"></i> Buat Work Order
                </Link>
                <Link to="/booking-meeting-room" className="btn btn-info">
                  <i className="fa fa-calendar me-2"></i> Booking Ruang Meeting
                </Link>
                <Link to="/request-customer" className="btn btn-warning">
                  <i className="fa fa-user-tie me-2"></i> Customer Request
                </Link>
              </div>
            </Card.Body>
          </Card>

          {/* Pending Approvals */}
          <Card className="border-0 shadow-sm mt-4">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Menunggu Persetujuan</h5>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">SOP IT Security</span>
                    <span className="badge bg-warning">Pending</span>
                  </div>
                </div>
                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">Kebijakan HR</span>
                    <span className="badge bg-warning">Pending</span>
                  </div>
                </div>
                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">Work Instruction</span>
                    <span className="badge bg-warning">Pending</span>
                  </div>
                </div>
              </div>
              <Link to="/sop" className="btn btn-sm btn-outline-primary w-100 mt-3">
                Lihat Semua
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
