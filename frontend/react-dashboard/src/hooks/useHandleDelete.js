import { useState } from 'react';
import axios from 'axios';

const useHandleDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (endpoint, id, onSuccess) => {
    setDeleting(true);
    setError(null);
    
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/${endpoint}/${id}/`);
        setDeleting(false);
        if (onSuccess) {
          onSuccess(); // Trigger additional actions like re-fetching
        }
      } catch (error) {
        setError("Error deleting the item: " + error.message);
        setDeleting(false);
      }
    } else {
      setDeleting(false);
    }
  };

  return { handleDelete, deleting, error };
};

export default useHandleDelete;
