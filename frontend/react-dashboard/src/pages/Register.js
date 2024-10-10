import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();  // To redirect after successful registration

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register/', formData);
      setSuccess(true);  // Show success message
      setErrors({});  // Clear any previous errors
      navigate('/login');  // Redirect to login after successful registration
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {success && <div className="alert alert-success">User registered successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="form-group mt-3">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
        </div>

        <div className="form-group mt-3">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
        </div>

        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <div className="form-group mt-3">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          {errors.confirm_password && <small className="text-danger">{errors.confirm_password}</small>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
