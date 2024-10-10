import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, searchTerm = "", triggerFetch = false) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/${endpoint}/?q=` + searchTerm, { signal })
      .then((response) => {
        setData(response.data); // Make sure response.data is the correct data structure
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Fetch aborted");
        } else {
          setError("Error fetching data: " + error.message);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [endpoint, searchTerm, triggerFetch]);  // Add triggerFetch to the dependency array

  return { data, loading, error };
};

export default useFetch;
