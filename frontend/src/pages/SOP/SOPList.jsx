import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import api from '../../services/api';

const SOPList = () => {
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchSOPs();
  }, []);

  const fetchSOPs = async () => {
    try {
      const response = await api.get('/sops');
      // Backend returns paginated data, extract the data array
      setSops(response.data.data.data || []);
    } catch (error) {
      console.error('Error fetching SOPs:', error);
      setSops([]);
    } finally {
      setLoading(false);
    }
  };

  const mockSOPs = [
    {
      id: 1,
      sop_number: 'SOP-2024-001',
      title: 'SOP IT Security',
      category: 'IT',
      department: 'IT Department',
      status: 'published',
      effective_date: '2024-01-01',
      created_at: '2024-01-01',
    },
    {
      id: 2,
      sop_number: 'SOP-2024-002',
      title: 'SOP Procurement',
      category: 'Finance',
      department: 'Finance Department',
      status: 'draft',
      effective_date: '2024-02-01',
      created_at: '2024-01-15',
    },
    {
      id: 3,
      sop_number: 'SOP-2024-003',
      title: 'SOP HR Recruitment',
      category: 'HR',
      department: 'HR Department',
      status: 'pending',
      effective_date: '2024-02-15',
      created_at: '2024-01-20',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      draft: { variant: 'secondary', text: 'Draft' },
      pending: { variant: 'warning', text: 'Pending' },
      approved: { variant: 'success', text: 'Approved' },
      published: { variant: 'primary', text: 'Published' },
      archived: { variant: 'dark', text: 'Archived' },
    };
    return badges[status] || badges.draft;
  };

  const filteredSOPs = sops.filter((sop) => {
    const matchesSearch =
      sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sop.sop_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || sop.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">SOP (Standard Operating Procedure)</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">SOP</li>
            </ul>
          </div>
          <div className="col-auto">
            <Link to="/sop/add" className="btn btn-primary">
              <i className="fa fa-plus me-2"></i>
              Tambah SOP
            </Link>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-6">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Cari SOP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-md-3">
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </Form.Select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>No SOP</th>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Departemen</th>
                  <th>Status</th>
                  <th>Tanggal Efektif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSOPs.length > 0 ? (
                  filteredSOPs.map((sop) => {
                    const statusBadge = getStatusBadge(sop.status);
                    return (
                      <tr key={sop.id}>
                        <td>{sop.sop_number}</td>
                        <td>{sop.title}</td>
                        <td>{sop.category || '-'}</td>
                        <td>{sop.department?.name || '-'}</td>
                        <td>
                          <Badge bg={statusBadge.variant}>
                            {statusBadge.text}
                          </Badge>
                        </td>
                        <td>{new Date(sop.effective_date).toLocaleDateString('id-ID')}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              to={`/sop/${sop.id}`}
                              className="btn btn-sm btn-info"
                              title="Lihat"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link
                              to={`/sop/edit/${sop.id}`}
                              className="btn btn-sm btn-primary"
                              title="Edit"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              title="Hapus"
                              onClick={() => {
                                if (window.confirm('Apakah Anda yakin ingin menghapus SOP ini?')) {
                                  // Handle delete
                                  console.log('Delete SOP:', sop.id);
                                }
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      Tidak ada data SOP
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SOPList;
