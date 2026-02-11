import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

const AddSOP = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    sop_number: '',
    title: '',
    description: '',
    category: '',
    department_id: '',
    effective_date: '',
    review_date: '',
    scope: '',
    procedure_steps: '',
    responsible_party: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
    if (isEdit) {
      fetchSOP();
    }
  }, [id]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data.data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      // Fallback to hardcoded departments
      setDepartments([
        { id: 1, name: 'IT Department' },
        { id: 2, name: 'Quality Assurance' },
        { id: 3, name: 'Human Resources' },
        { id: 4, name: 'Finance' },
        { id: 5, name: 'Operations' },
      ]);
    }
  };

  const fetchSOP = async () => {
    try {
      const response = await api.get(`/sops/${id}`);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching SOP:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sop_number) newErrors.sop_number = 'No SOP harus diisi';
    if (!formData.title) newErrors.title = 'Judul harus diisi';
    if (!formData.department_id) newErrors.department_id = 'Departemen harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let response;
      
      if (formData.file) {
        // Use FormData if file is present
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== null && formData[key] !== '') {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        if (isEdit) {
          response = await api.post(`/sops/${id}?_method=PUT`, formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          response = await api.post('/sops', formDataToSend, {
            headers: { 'Content-Type': 'multipart/formdata' }
          });
        }
      } else {
        // Use JSON if no file
        const dataToSend = { ...formData };
        delete dataToSend.file;
        
        if (isEdit) {
          response = await api.put(`/sops/${id}`, dataToSend);
        } else {
          response = await api.post('/sops', dataToSend);
        }
      }

      navigate('/sop');
    } catch (error) {
      console.error('Error saving SOP:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{isEdit ? 'Edit' : 'Tambah'} SOP</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/sop">SOP</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Tambah'}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    No SOP {!isEdit && <span className="text-muted">(Auto)</span>}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="sop_number"
                    value={formData.sop_number}
                    onChange={handleChange}
                    placeholder="Auto-generated"
                    disabled={!isEdit}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Kategori <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Operations">Operations</option>
                    <option value="Quality">Quality</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Judul <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Masukkan judul SOP"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi SOP"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Departemen <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    isInvalid={!!errors.department_id}
                  >
                    <option value="">Pilih Departemen</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.department_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Penanggung Jawab</Form.Label>
                  <Form.Control
                    type="text"
                    name="responsible_party"
                    value={formData.responsible_party}
                    onChange={handleChange}
                    placeholder="Nama penanggung jawab"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Tanggal Efektif <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="effective_date"
                    value={formData.effective_date}
                    onChange={handleChange}
                    isInvalid={!!errors.effective_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.effective_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Review</Form.Label>
                  <Form.Control
                    type="date"
                    name="review_date"
                    value={formData.review_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Scope/Ruang Lingkup</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    placeholder="Masukkan ruang lingkup SOP"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Langkah Prosedur</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="procedure_steps"
                    value={formData.procedure_steps}
                    onChange={handleChange}
                    placeholder="Masukkan langkah-langkah prosedur"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>File Dokumen</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  <Form.Text className="text-muted">
                    Format: PDF, DOC, DOCX (Max: 5MB)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="me-2"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    Simpan
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/sop')}
              >
                Batal
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddSOP;
