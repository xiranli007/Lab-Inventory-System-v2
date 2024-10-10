import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5" style={{ paddingTop: '70px' }}>
      <h2 className="text-center mb-4">Welcome to the Lab Inventory Management System</h2>

      <div className="row">
        {/* Culture Collection */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Culture Collection</h5>
              <p className="card-text">Manage and track bacterial culture records in your lab.</p>
              <Link to="/culture" className="btn btn-primary">Go to Culture Collection</Link>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Inventory</h5>
              <p className="card-text">Check lab supplies and manage inventory efficiently.</p>
              <Link to="/inventory" className="btn btn-primary">Go to Inventory</Link>
            </div>
          </div>
        </div>

        {/* Requests */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Requests</h5>
              <p className="card-text">Submit requests for lab supplies and follow up on them.</p>
              <Link to="/request" className="btn btn-primary">Go to Requests</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {/* Orders */}
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">Track your lab orders and review purchase records.</p>
              <Link to="/order" className="btn btn-primary">Go to Orders</Link>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">Update your user profile and account settings.</p>
              <Link to="/profile" className="btn btn-primary">Go to Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
