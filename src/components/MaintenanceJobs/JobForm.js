import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JobForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    componentSerial: "",
    jobType: "",
    priority: "Medium",
    status: "Pending",
    engineer: "",
    linkedShipIMO: "",
    scheduledDate: "",
  });

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("maintenance_jobs")) || [];
    if (jobId !== undefined) {
      const job = jobs[jobId];
      if (job) setForm(job);
    }
  }, [jobId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobs = JSON.parse(localStorage.getItem("maintenance_jobs")) || [];

    const isUpdate = jobId !== undefined;
    const oldJob = isUpdate ? jobs[jobId] : null;

    if (isUpdate) {
      jobs[jobId] = form;
    } else {
      jobs.push(form);
    }

    localStorage.setItem("maintenance_jobs", JSON.stringify(jobs));

    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

    let title = isUpdate ? "Job Updated" : "Job Created";

    if (isUpdate && oldJob && oldJob.status !== "Completed" && form.status === "Completed") {
      title = "Job Completed";
    }

    const notification = {
      title,
      message: `${form.jobType} for component ${form.componentSerial}`,
      date: new Date().toISOString(),
      id: Date.now(),
    };

    notifications.push(notification);
    localStorage.setItem("notifications", JSON.stringify(notifications));

    navigate("/maintenance-jobs");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{jobId !== undefined ? "Edit" : "Add"} Maintenance Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          name="componentSerial"
          placeholder="Component Serial"
          value={form.componentSerial}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          required
          name="jobType"
          placeholder="Job Type"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input
          required
          name="engineer"
          placeholder="Assigned Engineer"
          value={form.engineer}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          required
          name="linkedShipIMO"
          placeholder="Linked Ship IMO"
          value={form.linkedShipIMO}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <label className="block text-sm font-medium text-gray-700">
          Scheduled Date
        </label>
        <input
          type="date"
          name="scheduledDate"
          value={form.scheduledDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {jobId !== undefined ? "Update Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
