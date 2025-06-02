import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";

function MaintenanceCalendar() {
  const [jobs, setJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [jobsForDate, setJobsForDate] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("maintenance_jobs")) || [];
    setJobs(storedJobs);
  }, []);

  useEffect(() => {
    const dateStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    const filtered = jobs.filter(job => {
      return job.scheduledDate === dateStr;
    });

    setJobsForDate(filtered);
  }, [selectedDate, jobs]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Maintenance Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      <h3 className="mt-6 text-xl font-semibold">
        Jobs on {selectedDate.toDateString()}
      </h3>

      {jobsForDate.length === 0 ? (
        <p className="mt-2">No jobs scheduled for this day.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {jobsForDate.map((job, idx) => (
            <li key={idx} className="border p-3 rounded shadow-sm">
              <div><strong>Component Serial:</strong> {job.componentSerial}</div>
              <div><strong>Job Type:</strong> {job.jobType}</div>
              <div><strong>Priority:</strong> {job.priority}</div>
              <div><strong>Status:</strong> {job.status}</div>
              <div><strong>Engineer:</strong> {job.engineer}</div>
              <Link 
                to={`/maintenance-jobs/edit/${idx}`} 
                className="text-blue-600 underline mt-1 block"
              >
                Edit Job
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MaintenanceCalendar;
