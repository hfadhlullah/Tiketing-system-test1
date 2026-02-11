import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const QualityManualList = () => {
  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Manual Mutu</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Manual Mutu</li>
            </ul>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary">
              <i className="fa fa-plus me-2"></i>
              Tambah Manual Mutu
            </button>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <p className="text-muted">Halaman Manual Mutu - Coming Soon</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QualityManualList;
