import React, { useState } from 'react';
import axios from 'axios';

const AddForm = ({ fields, apiUrl, onAdd, entityName }) => {
  const initialFormData = fields.reduce((obj, field) => {
    obj[field.name] = field.defaultValue || '';  // Initialize form data dynamically
    return obj;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  // Handle input change dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage(null);

    // Basic validation (you can customize this or pass validation rules as props)
    const requiredFields = fields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!formData[field.name]) {
        setMessage(`${field.label} is required.`);
        setMessageType('error');
        setIsSubmitting(false);
        return;
      }
    }

    // Submit the form data to the backend API
    axios.post(apiUrl, formData)
      .then(response => {
        onAdd(response.data);
        setMessage(`${entityName} added successfully!`);
        setMessageType('success');
        setIsSubmitting(false);

        // Clear the form after successful submission
        setFormData(initialFormData);
      })
      .catch(error => {
        console.error('Error adding item:', error);
        setMessage(`Error adding ${entityName}.`);
        setMessageType('error');
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Add {entityName}</h5>

      {/* Success/Error message display */}
      {message && (
        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      {/* Dynamically generate form fields */}
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label>{field.label}{field.required ? ' (required)' : ''}</label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              className="form-control"
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              className="form-control"
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <input className="btn btn-success btn-block" type="submit" value={`Add ${entityName}`} disabled={isSubmitting} />
    </form>
  );
};

export default AddForm;
