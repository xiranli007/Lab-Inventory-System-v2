import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',  // Use email instead of username
    password: ''
  });
  const [errors, setErrors] = useState(false);
  const { login } = useContext(AuthContext);  // Use AuthContext for login
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        email: formData.email,  // Use email in the payload
        password: formData.password
      });

      const { access, refresh } = response.data;

      // Store tokens in localStorage (or cookies)
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Trigger login action and redirect to home
      login();  // Update context state
      navigate('/');  // Redirect to home page
    } catch (error) {
      setErrors(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {errors && (
                  <div className="alert alert-danger mt-3">
                    Invalid email or password.
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
