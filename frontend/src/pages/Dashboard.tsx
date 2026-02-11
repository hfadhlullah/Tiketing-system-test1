import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Dashboard</h4>
                        <h6>Welcome to DIOS Dashboard</h6>
                    </div>
                </div>
            </div>
            {/* Add dashboard content here */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5>Dashboard Content Coming Soon</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
