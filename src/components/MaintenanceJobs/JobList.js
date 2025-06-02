import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ ship: '', status: '', priority: '' });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("maintenance_jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      (!filters.ship || job.linkedShipIMO.includes(filters.ship)) &&
      (!filters.status || job.status === filters.status) &&
      (!filters.priority || job.priority === filters.priority)
    );
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Maintenance Jobs</h1>
        <Link to="/maintenance-jobs/new" className="bg-blue-600 text-white px-4 py-2 rounded">Add Job</Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <input name="ship" onChange={handleChange} value={filters.ship} placeholder="Filter by Ship IMO" className="border px-2 py-1 rounded" />
        <select name="status" onChange={handleChange} value={filters.status} className="border px-2 py-1 rounded">
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select name="priority" onChange={handleChange} value={filters.priority} className="border px-2 py-1 rounded">
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">Component</th>
            <th className="border px-3 py-2">Job Type</th>
            <th className="border px-3 py-2">Priority</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Engineer</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-3 py-2">{job.componentSerial}</td>
              <td className="px-3 py-2">{job.jobType}</td>
              <td className="px-3 py-2">{job.priority}</td>
              <td className="px-3 py-2">{job.status}</td>
              <td className="px-3 py-2">{job.engineer}</td>
              <td className="px-3 py-2">
                <Link to={`/maintenance-jobs/edit/${idx}`} className="text-blue-600 underline">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;
