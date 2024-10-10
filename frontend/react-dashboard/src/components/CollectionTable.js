import React from 'react';
import { Link } from 'react-router-dom';

const CollectionTable = ({ collections, handleDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered align-middle">
        <thead className="bg-info text-white">
          <tr>
            <th>Organism</th>
            <th>ID#</th>
            <th>Copy Saved</th>
            <th>Description</th>
            <th>Isolation Source</th>
            <th>Received From</th>
            <th>Additional Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(row => (
            <tr key={row.id}>
              <td>{row.organism}</td>
              <td>{row.idNumber}</td>
              <td>{row.copySaved}</td>
              <td>{row.description}</td>
              <td>{row.isolationSource}</td>
              <td>{row.receivedFrom}</td>
              <td>{row.additionalInfo}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to={`/culture/edit/${row.id}`} className="btn btn-info btn-sm me-2">  {/* Added margin */}
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

export default CollectionTable;
