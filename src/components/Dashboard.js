import React from "react";
import { getCurrentUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Welcome, {user.role}</h1>
      <p>Email: {user.email}</p>

      <div className="mt-4">
        {user.role === "Admin" && <p>🔧 Admin can manage all users and ships.</p>}
        {user.role === "Inspector" && <p>🔍 Inspector can view and schedule inspections.</p>}
        {user.role === "Engineer" && <p>🛠 Engineer can manage repair jobs.</p>}
      </div>
      <button
        onClick={() => navigate("/ships")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Manage Ships
      </button>
      <button
        onClick={() => navigate("/ship-components")}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Manage Components
      </button>
      <button
        onClick={() => navigate("/maintenance-jobs")}
        className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Manage Maintenance Jobs
      </button>
      <button
        onClick={() => navigate("/maintenance-calendar")}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Maintenance Calendar
      </button>
      <button
        onClick={() => navigate("/notifications")}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Notification Center
      </button>
      <button
        onClick={() => navigate("/kpis")}
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        View KPIs Dashboard
      </button>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
