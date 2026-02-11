import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const OrganizationalStructure = () => {
  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Struktur Organisasi</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Struktur Organisasi</li>
            </ul>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <p className="text-muted">Halaman Struktur Organisasi - Coming Soon</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrganizationalStructure;
