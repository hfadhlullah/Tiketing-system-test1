import React, { useState } from 'react';

const StrukturOrganisasi: React.FC = () => {
    // Mock data based on the template
    const [documents] = useState([
        {
            id: 1,
            noDokumen: 'DPP-HRGA-SO-001',
            namaDokumen: 'Struktur Organisasi PT. Difan Prima Paint',
            tanggal: '11-11-2020',
            revisi: 9,
            status: 'Aktif',
            file: '/public/uploads/DPP-HRGA-SO-001-rev9.pdf'
        }
    ]);

    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    return (
        <div>
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Struktur Organisasi</h4>
                        <h6>Manage Struktur Organisasi</h6>
                    </div>
                </div>
                <ul className="table-top-head">
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img
                            src="/assets/img/icons/pdf.svg" alt="img" /></a>
                    </li>
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img
                            src="/assets/img/icons/excel.svg" alt="img" /></a>
                    </li>
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i
                            className="ti ti-refresh"></i></a>
                    </li>
                </ul>
            </div>

            {/* Product List */}
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <div className="search-set">
                        <div className="search-input">
                            <span className="btn-searchset"><i className="ti ti-search fs-14 feather-search"></i></span>
                        </div>
                    </div>
                    <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                        <div className="dropdown me-2">
                            <a href="#"
                                className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                                data-bs-toggle="dropdown">
                                Status
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                    <a href="#" className="dropdown-item rounded-1">Aktif</a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item rounded-1">Tidak Aktif</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table datatable">
                            <thead className="thead-light">
                                <tr>
                                    <th>No</th>
                                    <th>No Dokumen</th>
                                    <th>Nama Dokumen</th>
                                    <th>Tanggal Efektif</th>
                                    <th>Revisi</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="sales-list">
                                {documents.map((doc, index) => (
                                    <tr key={doc.id}>
                                        <td>{index + 1}</td>
                                        <td>{doc.noDokumen}</td>
                                        <td>{doc.namaDokumen}</td>
                                        <td>{doc.tanggal}</td>
                                        <td>{doc.revisi}</td>
                                        <td><span className={`badge badge-${doc.status === 'Aktif' ? 'success' : 'danger'}`}>{doc.status}</span></td>
                                        <td className="action-table-data">
                                            <div className="edit-delete-action">
                                                <a className="me-2 edit-icon p-2" href="#"
                                                    data-bs-toggle="modal" data-bs-target="#view-document-modal"
                                                    onClick={() => setSelectedDoc(doc)}>
                                                    <i data-feather="eye" className="feather-eye"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* /Product List */}

            {/* Modal */}
            <div className="modal fade" id="view-document-modal">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header">
                                    <div className="page-title">
                                        <h4>{selectedDoc ? selectedDoc.noDokumen : ''} | {selectedDoc ? selectedDoc.namaDokumen : ''}</h4>
                                    </div>
                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                {selectedDoc && (
                                                    <embed src={selectedDoc.file} type='application/pdf' width='100%' height="800px" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StrukturOrganisasi;
