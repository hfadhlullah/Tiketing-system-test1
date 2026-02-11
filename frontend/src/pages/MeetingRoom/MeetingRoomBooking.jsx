import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const MeetingRoomBooking = () => {
  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Booking Ruang Meeting</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Booking</li>
            </ul>
          </div>
          <div className="col-auto">
            <Link to="/kalender-ruang-meeting" className="btn btn-info">
              <i className="fa fa-calendar me-2"></i>
              Lihat Kalender
            </Link>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <p className="text-muted">Halaman Booking Ruang Meeting - Coming Soon</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MeetingRoomBooking;
