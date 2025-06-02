import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ComponentProfile() {
  const { serialNumber } = useParams();
  const navigate = useNavigate();

  const [component, setComponent] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("components_data")) || [];
    const comp = data.find(c => c.serialNumber === serialNumber);
    setComponent(comp);
  }, [serialNumber]);

  if (!component) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p>Component not found.</p>
        <button
          onClick={() => navigate("/ship-components")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Components List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Component Details</h1>

      <div className="mb-2"><strong>Name:</strong> {component.name}</div>
      <div className="mb-2"><strong>Serial Number:</strong> {component.serialNumber}</div>
      <div className="mb-2"><strong>Installation Date:</strong> {component.installationDate}</div>
      <div className="mb-2"><strong>Last Maintenance Date:</strong> {component.lastMaintenanceDate}</div>
      <div className="mb-2"><strong>Linked Ship IMO Number:</strong> {component.linkedShipIMO}</div>

      <button
        onClick={() => navigate(`/ship-components/edit/${component.serialNumber}`)}
        className="mr-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        onClick={() => navigate("/ship-components")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Components List
      </button>
    </div>
  );
}

export default ComponentProfile;
