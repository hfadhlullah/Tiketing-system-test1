import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const CustomerRequestList = () => {
  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Request Customer</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Request Customer</li>
            </ul>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary">
              <i className="fa fa-plus me-2"></i>
              Tambah Request
            </button>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <p className="text-muted">Halaman Request Customer - Coming Soon</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomerRequestList;
