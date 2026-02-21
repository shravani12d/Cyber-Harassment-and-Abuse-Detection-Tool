import React, { useEffect, useState } from "react";
import axios from "axios";

const AbuseLogsTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/logs")
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Abusive Messages</h3>

 <table className="admin-table">

        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>severity</th>
            <th>Date & Time</th>
            <th>Abuse Count</th>
            <th>Recommended Actions</th>
          </tr>
        </thead>

        <tbody>
  {logs.map((log) => (
    <tr key={log.id}>
      <td>{log.userId || "Anonymous"}</td>
      <td>{log.message}</td>
     <td>
  <span className={
    log.severity === "High"
      ? "badge-high"
      : log.severity === "Medium"
      ? "badge-medium"
      : "badge-low"
  }>
    {log.severity}
  </span>
</td>

      <td>{new Date(log.timestamp).toLocaleString()}</td>
      <td>{log.abuseCountAtTime}</td>
      <td>
  {log.abuseCountAtTime >= 3 ? (
    <span className="action-danger">Recommend Block</span>
  ) : log.severity === "High" ? (
    <span className="action-warning">Strong Warning</span>
  ) : (
    <span className="action-monitor">Monitor</span>
  )}
</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AbuseLogsTable;
