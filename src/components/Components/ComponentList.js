import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ComponentList() {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("components_data")) || [];
    setComponents(data);
  }, []);

  const handleDelete = (serialNumber) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      const data = JSON.parse(localStorage.getItem("components_data")) || [];
      const filtered = data.filter(c => c.serialNumber !== serialNumber);
      localStorage.setItem("components_data", JSON.stringify(filtered));
      setComponents(filtered);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Components List</h1>

      <button
        onClick={() => navigate("/ship-components/new")}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Component
      </button>

      {components.length === 0 ? (
        <p>No components found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Serial Number</th>
              <th className="border border-gray-300 p-2">Installation Date</th>
              <th className="border border-gray-300 p-2">Last Maintenance</th>
              <th className="border border-gray-300 p-2">Linked Ship IMO</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {components.map((comp) => (
              <tr key={comp.serialNumber} className="text-center">
                <td className="border border-gray-300 p-2">{comp.name}</td>
                <td className="border border-gray-300 p-2">{comp.serialNumber}</td>
                <td className="border border-gray-300 p-2">{comp.installationDate}</td>
                <td className="border border-gray-300 p-2">{comp.lastMaintenanceDate}</td>
                <td className="border border-gray-300 p-2">{comp.linkedShipIMO}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/ship-components/${comp.serialNumber}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/ship-components/edit/${comp.serialNumber}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comp.serialNumber)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComponentList;
