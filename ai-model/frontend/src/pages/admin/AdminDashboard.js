import React, { useEffect, useState } from "react";
import AbuseLogsTable from "./AbuseLogsTable";
import BlockedUsersTable from "./BlockedUsersTable";


function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [report, setReport] = useState(null);

 useEffect(() => {
  fetch("http://localhost:8080/admin/logs")
    .then(res => {
      if (!res.ok) throw new Error("Logs fetch failed");
      return res.json();
    })
    .then(data => setLogs(data))
    .catch(err => console.error(err));

  fetch("http://localhost:8080/admin/blocked-users")
    .then(res => {
      if (!res.ok) throw new Error("Blocked users fetch failed");
      return res.json();
    })
    .then(data => setBlockedUsers(data))
    .catch(err => console.error(err));

  fetch("http://localhost:8080/admin/report")
    .then(res => {
      if (!res.ok) throw new Error("Report fetch failed");
      return res.json();
    })
    .then(data => setReport(data))
    .catch(err => console.error(err));
}, []);


  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel – Abuse Monitoring</h2>

      {report && (
        <div style={{ background: "#f4f4f4", padding: "15px", marginBottom: "20px" }}>
          <h3>📊 Report Summary</h3>
          <p>Total Abusive Messages: {report.totalAbuseMessages}</p>
          <p>Blocked Users: {report.blockedUsers}</p>
          <p>Generated At: {report.generatedAt}</p>
        </div>
      )}
      <div className="report-buttons flex gap-4 mb-4">
  <button
    onClick={() => { window.location.href = "http://localhost:5000/download_abuse_evidence"; }}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Download Abuse Evidence
  </button>

  <button
    onClick={() => { window.location.href = "http://localhost:5000/download_blocked_users"; }}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Download Blocked Users
  </button>
</div>
      <h3>Abuse Evidence</h3>
      <AbuseLogsTable logs={logs}/>
      

      <h3>Blocked users</h3>
      <BlockedUsersTable users={blockedUsers}/>
      </div>
      )};

export default AdminDashboard;
