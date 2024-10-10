import React from 'react';
import { Link } from 'react-router-dom';

const InventoryTable = ({ collections, handleDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered align-middle">
        <thead className="bg-info text-white">
          <tr>
            <th>Item Name</th>  {/* Item Name is now directly available */}
            <th>Quantity</th>
            <th>Received By (First Name)</th>  {/* Received By First Name */}
            <th>Storage</th>
            <th>Received Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(row => (
            <tr key={row.id}>
              <td>{row.item_name || 'N/A'}</td>  {/* Display item_name from the API */}
              <td>{row.quantity}</td>
              <td>{row.received_by_first_name || 'N/A'}</td>  {/* Display received_by_first_name */}
              <td>{row.storage}</td>
              <td>{new Date(row.receivedDate).toLocaleDateString()}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to={`/inventory/edit/${row.id}`} className="btn btn-info btn-sm me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(row.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;