import React, { useState, useEffect } from "react";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
  }, []);

  const dismissNotification = (index) => {
    const updated = [...notifications];
    updated.splice(index, 1);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  if (notifications.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Notification Center</h2>
        <p>No notifications.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notification Center</h2>
      <ul className="space-y-3">
        {notifications.map((note, idx) => (
          <li
            key={idx}
            className="border rounded p-3 flex justify-between items-start shadow"
          >
            <div>
              <strong>{note.title}</strong>
              <p className="text-sm">{note.message}</p>
              <small className="text-gray-500">{new Date(note.date).toLocaleString()}</small>
            </div>
            <button
              onClick={() => dismissNotification(idx)}
              className="text-red-600 hover:text-red-800 font-bold text-xl leading-none ml-4"
              aria-label="Dismiss notification"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationCenter;
