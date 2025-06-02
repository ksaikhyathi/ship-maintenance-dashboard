import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SHIPS_KEY = 'ships_data';

function ShipProfile() {
  const { imoNumber } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem(SHIPS_KEY)) || [];
    const foundShip = storedShips.find((s) => s.imoNumber === imoNumber);
    if (foundShip) {
      setShip(foundShip);
    } else {
      alert('Ship not found');
      navigate('/ships');
    }
  }, [imoNumber, navigate]);

  if (!ship) return null;
  
  const maintenanceHistory = ship.maintenanceHistory || [];
  const components = ship.components || [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ship Profile: {ship.name}</h2>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">General Information</h3>
        <ul className="list-disc list-inside">
          <li><strong>IMO Number:</strong> {ship.imoNumber}</li>
          <li><strong>Flag:</strong> {ship.flag}</li>
          <li><strong>Status:</strong> {ship.status}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Maintenance History</h3>
        {maintenanceHistory.length === 0 ? (
          <p>No maintenance records available.</p>
        ) : (
          <ul className="list-disc list-inside">
            {maintenanceHistory.map((job, idx) => (
              <li key={idx}>{job}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Components Installed</h3>
        {components.length === 0 ? (
          <p>No components recorded.</p>
        ) : (
          <ul className="list-disc list-inside">
            {components.map((comp, idx) => (
              <li key={idx}>{comp}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ShipProfile;
