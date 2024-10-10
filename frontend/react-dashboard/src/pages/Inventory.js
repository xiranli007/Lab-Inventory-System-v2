import React, { useState } from 'react';
import InventoryTable from '../components/InventoryTable';  // Import the new InventoryTable component
import AddForm from '../components/AddForm';  // Import the dynamic AddForm component
import useFetch from '../hooks/useFetch';
import useHandleDelete from '../hooks/useHandleDelete';  // Import the delete hook

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { data: collections, loading, error } = useFetch('dashboard/inventory', searchTerm, triggerFetch);
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

  // Define the dynamic fields for the AddForm for inventory
  const fields = [
    { name: 'item', label: 'Item', type: 'select', required: true },  // Assuming Item is a ForeignKey relation
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'receivedBy', label: 'Received By', type: 'select', required: true },  // Assuming User is a ForeignKey relation
    { name: 'storage', label: 'Storage', type: 'textarea', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true },  // Assuming Category is a ForeignKey relation
    { name: 'receivedDate', label: 'Received Date', type: 'date', required: true }
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
                apiUrl="http://127.0.0.1:8000/api/dashboard/inventory/"
                onAdd={onAdd}
                entityName="Inventory Item"
              />
            </div>
          </div>
        </div>

        {/* Inventory Table on the right side */}
        <div className="col-md-8">
          <h2>Inventory</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inventory..."
              className="form-control"
            />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>

          {loading && <p>Loading data...</p>}
          {error && <p>{error}</p>}
          {deleteError && <p>{deleteError}</p>}

          {/* Pass collections and handleDelete to InventoryTable */}
          <InventoryTable 
            collections={collections} 
            handleDelete={(id) => handleDelete('dashboard/inventory', id, triggerDataUpdate)} 
          />

          {deleting && <p>Deleting item...</p>}
        </div>
      </div>
    </div>
  );
};

export default Inventory;