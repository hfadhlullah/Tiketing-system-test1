import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const AddWorkOrder = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Tambah Work Order</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/work-order">Work Order</Link>
              </li>
              <li className="breadcrumb-item active">Tambah</li>
            </ul>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <p className="text-muted">Form Work Order - Coming Soon</p>
          <Button variant="secondary" onClick={() => navigate('/work-order')}>
            Kembali
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddWorkOrder;
