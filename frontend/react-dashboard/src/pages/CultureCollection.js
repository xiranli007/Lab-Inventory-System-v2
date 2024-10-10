import React, { useState } from 'react';
import CollectionTable from '../components/CollectionTable';
import AddForm from '../components/AddForm';  // Import the dynamic AddForm component
import useFetch from '../hooks/useFetch';
import useHandleDelete from '../hooks/useHandleDelete';  // Import the delete hook

const CultureCollection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { data: collections, loading, error } = useFetch('dashboard/cultures', searchTerm, triggerFetch);
  const { handleDelete, deleting, deleteError } = useHandleDelete();

  const triggerDataUpdate = () => {
    setTriggerFetch(prev => !prev);
  };

  const onAdd = (newItem) => {
    triggerDataUpdate();  // Re-fetch the data after adding
  };

  // Greedy search function (only show items containing the search term)
  const handleSearch = () => {
    setTriggerFetch(!triggerFetch);
  };

  // Define the dynamic fields for the AddForm
  const fields = [
    { name: 'boxNumber', label: 'Box Number', type: 'text', required: true },
    { name: 'organism', label: 'Organism', type: 'text', required: true },
    { name: 'idNumber', label: 'ID Number', type: 'text' },
    { name: 'copySaved', label: 'Copy Saved', type: 'number', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'isolationSource', label: 'Isolation Source', type: 'text' },
    { name: 'receivedFrom', label: 'Received From', type: 'text', required: true },
    { name: 'receivedDate', label: 'Received Date', type: 'date', required: true },
    { name: 'additionalInfo', label: 'Additional Info', type: 'textarea' }
  ];

  return (
    <div className="container-fluid mt-5" style={{ paddingTop: '80px' }}> {/* Added margin to fix overlap */}
      <div className="row">
        {/* Add Form on the left side */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <AddForm
                fields={fields}
                apiUrl="http://127.0.0.1:8000/api/dashboard/cultures/"
                onAdd={onAdd}
                entityName="Culture"
              />
            </div>
          </div>
        </div>

        {/* Collection Table on the right side */}
        <div className="col-md-8">
          <h2>Culture Collection</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search collections..."
              className="form-control"
            />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>

          {loading && <p>Loading data...</p>}
          {error && <p>{error}</p>}
          {deleteError && <p>{deleteError}</p>}

          {/* Pass collections and handleDelete to CollectionTable */}
          <CollectionTable 
            collections={collections} 
            handleDelete={(id) => handleDelete('dashboard/cultures', id, triggerDataUpdate)} 
          />

          {deleting && <p>Deleting item...</p>}
        </div>
      </div>
    </div>
  );
};

export default CultureCollection;
