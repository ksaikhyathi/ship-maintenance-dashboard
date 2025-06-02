import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SHIPS_KEY = 'ships_data';

const initialFormState = {
  name: '',
  imoNumber: '',
  flag: '',
  status: 'Active',
};

function ShipForm() {
  const navigate = useNavigate();
  const { imoNumber } = useParams();

  const [formData, setFormData] = useState(initialFormState);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (imoNumber) {
      const storedShips = JSON.parse(localStorage.getItem(SHIPS_KEY)) || [];
      const ship = storedShips.find((s) => s.imoNumber === imoNumber);
      if (ship) {
        setFormData(ship);
        setIsEditMode(true);
      } else {
        alert('Ship not found');
        navigate('/ships');
      }
    }
  }, [imoNumber, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let storedShips = JSON.parse(localStorage.getItem(SHIPS_KEY)) || [];

    if (isEditMode) {
      storedShips = storedShips.map((ship) =>
        ship.imoNumber === imoNumber ? formData : ship
      );
    } else {
      if (storedShips.some((ship) => ship.imoNumber === formData.imoNumber)) {
        alert('IMO Number already exists!');
        return;
      }
      storedShips.push(formData);
    }

    localStorage.setItem(SHIPS_KEY, JSON.stringify(storedShips));
    navigate('/ships');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Ship' : 'Add New Ship'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">IMO Number</label>
          <input
            name="imoNumber"
            value={formData.imoNumber}
            onChange={handleChange}
            required
            disabled={isEditMode}
            className={`w-full border px-3 py-2 rounded ${isEditMode ? 'bg-gray-100' : ''}`}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Flag</label>
          <input
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEditMode ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/ships')}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShipForm;
