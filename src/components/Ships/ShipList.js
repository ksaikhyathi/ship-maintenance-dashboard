import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SHIPS_KEY = 'ships_data';

function ShipList() {
  const [ships, setShips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem(SHIPS_KEY)) || [];
    setShips(storedShips);
  }, []);

  const deleteShip = (imoNumber) => {
    if (window.confirm('Are you sure you want to delete this ship?')) {
      const updatedShips = ships.filter(ship => ship.imoNumber !== imoNumber);
      setShips(updatedShips);
      localStorage.setItem(SHIPS_KEY, JSON.stringify(updatedShips));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ships List</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate('/ships/new')}
      >
        + Add New Ship
      </button>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">IMO Number</th>
            <th className="border px-4 py-2">Flag</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.length === 0 ? (
            <tr><td colSpan="5" className="text-center p-4">No ships found</td></tr>
          ) : (
            ships.map((ship) => (
              <tr key={ship.imoNumber} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{ship.name}</td>
                <td className="border px-4 py-2">{ship.imoNumber}</td>
                <td className="border px-4 py-2">{ship.flag}</td>
                <td className="border px-4 py-2">{ship.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => navigate(`/ships/${ship.imoNumber}`)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 underline"
                    onClick={() => navigate(`/ships/edit/${ship.imoNumber}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 underline"
                    onClick={() => deleteShip(ship.imoNumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShipList;
