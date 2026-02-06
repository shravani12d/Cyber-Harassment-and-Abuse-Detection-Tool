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

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>severity</th>
            <th>Date & Time</th>
            <th>Abuse Count</th>
          </tr>
        </thead>

        <tbody>
  {logs.map((log) => (
    <tr key={log.id}>
      <td>{log.userId || "Anonymous"}</td>
      <td>{log.message}</td>
      <td>{log.severity}</td>
      <td>{new Date(log.timestamp).toLocaleString()}</td>
      <td>{log.abuseCountAtTime}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AbuseLogsTable;
