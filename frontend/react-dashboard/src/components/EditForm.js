import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditForm = ({ id, fields, apiUrl, entityName }) => {
  const navigate = useNavigate();  // To navigate after submission
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing item data based on the id
  useEffect(() => {
    axios
      .get(`${apiUrl}/${id}/`)
      .then((response) => {
        setFormData(response.data);  // Pre-fill the form with the fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
        setError("Error fetching item data.");
        setLoading(false);
      });
  }, [id, apiUrl]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);  // Disable submit button during submission

    // Submit the updated form data to the backend API (PUT request)
    axios
      .put(`${apiUrl}/${id}/`, formData)
      .then(() => {
        navigate("/culture");  // Redirect after successful update
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setError("Error updating the item.");
        setIsSubmitting(false);  // Re-enable the submit button on error
      });
  };

  // Handle going back without saving
  const handleGoBack = () => {
    navigate("/culture");  // Redirect back to the collection page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Edit {entityName}</h5>

      {/* Dynamically generate form fields */}
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label>{field.label}{field.required ? ' (required)' : ''}</label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              className="form-control"
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              className="form-control"
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <button className="btn btn-primary me-2 mt-2" type="submit" disabled={isSubmitting}>
        Save
      </button>
      <button className="btn btn-secondary ml-2 mt-2" type="button" onClick={handleGoBack}>
        Go Back
      </button>
    </form>
  );
};

export default EditForm;
