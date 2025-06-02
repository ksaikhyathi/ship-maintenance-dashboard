import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const KPIsDashboard = () => {
  const [totalShips, setTotalShips] = useState(0);
  const [overdueComponents, setOverdueComponents] = useState(0);
  const [jobsInProgress, setJobsInProgress] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);

  useEffect(() => {

    const ships = JSON.parse(localStorage.getItem("ships")) || [];
    setTotalShips(ships.length);


    const components = JSON.parse(localStorage.getItem("components")) || [];
    const now = new Date();
    const overdueCount = components.filter(c => {
      if (!c.nextMaintenanceDate) return false;
      return new Date(c.nextMaintenanceDate) < now;
    }).length;
    setOverdueComponents(overdueCount);

    const jobs = JSON.parse(localStorage.getItem("maintenance_jobs")) || [];
    setJobsInProgress(jobs.filter(j => j.status === "In Progress").length);
    setJobsCompleted(jobs.filter(j => j.status === "Completed").length);

  }, []);

  const pieData = [
    { name: "In Progress", value: jobsInProgress, color: "#f59e0b" },
    { name: "Completed", value: jobsCompleted, color: "#22c55e" },
    { name: "Pending", value: Math.max(0, totalShips - jobsInProgress - jobsCompleted), color: "#ef4444" } // red-500
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">KPIs Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Ships</h2>
          <p className="text-4xl font-bold">{totalShips}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Components Overdue</h2>
          <p className="text-4xl font-bold">{overdueComponents}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Jobs In Progress</h2>
          <p className="text-4xl font-bold">{jobsInProgress}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Jobs Completed</h2>
          <p className="text-4xl font-bold">{jobsCompleted}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">Maintenance Jobs Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KPIsDashboard;
