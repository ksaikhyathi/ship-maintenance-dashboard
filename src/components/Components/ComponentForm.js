import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ComponentForm() {
  const navigate = useNavigate();
  const { serialNumber } = useParams();

  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: "",
    linkedShipIMO: ""
  });

  useEffect(() => {
    if (serialNumber) {
      const data = JSON.parse(localStorage.getItem("components_data")) || [];
      const comp = data.find(c => c.serialNumber === serialNumber);
      if (comp) setForm(comp);
    }
  }, [serialNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("components_data")) || [];

    if (serialNumber) {
      const idx = data.findIndex(c => c.serialNumber === serialNumber);
      if (idx !== -1) {
        data[idx] = form;
      }
    } else {
      if (data.some(c => c.serialNumber === form.serialNumber)) {
        alert("Serial Number must be unique.");
        return;
      }
      data.push(form);
    }

    localStorage.setItem("components_data", JSON.stringify(data));
    navigate("/ship-components");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{serialNumber ? "Edit Component" : "Add New Component"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Serial Number</label>
          <input
            required
            name="serialNumber"
            value={form.serialNumber}
            onChange={handleChange}
            disabled={!!serialNumber}
            className={`w-full border border-gray-400 rounded px-3 py-2 ${serialNumber ? "bg-gray-100" : ""}`}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Installation Date</label>
          <input
            required
            type="date"
            name="installationDate"
            value={form.installationDate}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Last Maintenance Date</label>
          <input
            required
            type="date"
            name="lastMaintenanceDate"
            value={form.lastMaintenanceDate}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Linked Ship IMO Number</label>
          <input
            required
            name="linkedShipIMO"
            value={form.linkedShipIMO}
            onChange={handleChange}
            placeholder="Enter IMO Number of linked ship"
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {serialNumber ? "Update Component" : "Add Component"}
        </button>
      </form>
    </div>
  );
}

export default ComponentForm;
