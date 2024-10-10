import React from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";  // Import the modular EditForm

const EditPage = () => {
  const { id } = useParams();  // Get the item ID from the URL

  // Define the dynamic fields for the EditForm
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
    <div className="container">
      <h2>Edit Culture Item</h2>

      {/* Use the modular EditForm */}
      <EditForm
        id={id}
        fields={fields}
        apiUrl="http://127.0.0.1:8000/api/dashboard/cultures"
        entityName="Culture"
      />
    </div>
  );
};

export default EditPage;
