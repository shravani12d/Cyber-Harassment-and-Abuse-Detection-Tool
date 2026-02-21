import { useEffect, useState } from "react";
import AbuseLogsTable from "./AbuseLogsTable";
import BlockedUsersTable from "./BlockedUsersTable";
import "./Admin.css";
import {LineChart,Line,XAxis,Tooltip,ResponsiveContainer,} from "recharts";

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
// ===== Dashboard Calculations =====

const totalIncidents = logs.length;

const highSeverityCount = logs.filter(
  (log) => log.severity === "High"
).length;

const blockedCount = blockedUsers.length;

const recentLogs = logs.slice(0, 5);

// Trend calculation
const trendData = logs.reduce((acc, log) => {
  const date = new Date(log.timestamp).toLocaleDateString();

  const existing = acc.find((item) => item.date === date);

  if (existing) {
    existing.count += 1;
  } else {
    acc.push({ date, count: 1 });
  }

  return acc;
}, []);

// Download Abuse Logs
const downloadAbuseLogs = () => {
  fetch("http://localhost:5000/download_abuse_evidence")
    .then(res => {
      if (!res.ok) throw new Error("No abuse logs found");
      return res.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "abuse_evidence.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(err => alert(err.message));
};

// Download Blocked Users
const downloadBlockedUsers = () => {
  fetch("http://localhost:5000/download_blocked_users")
    .then(res => {
      if (!res.ok) throw new Error("No blocked users found");
      return res.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "blocked_users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(err => alert(err.message));
};
return (
  <div className="dashboard-container">
    <h2 className="dashboard-title">Admin Dashboard</h2>

    {/* ===== Stats Cards ===== */}
    <div className="stats-grid">
      <div className="card blue">
        <h4>Total Incidents</h4>
        <h1>{totalIncidents}</h1>
      </div>

      <div className="card red">
        <h4>High Severity</h4>
        <h1>{highSeverityCount}</h1>
      </div>

      <div className="card purple">
        <h4>Blocked Users</h4>
        <h1>{blockedCount}</h1>
      </div>
    </div>

    {/* ===== Trend Graph ===== */}
    <div className="trend-card">
      <h3>Abuse Trend (Last 7 Days)</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={trendData}>
          <XAxis dataKey="date" stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8b5cf6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* ===== Recent Flagged Messages ===== */}
    <div className="table-card">
      <h3>Recent Flagged Messages</h3>
      <AbuseLogsTable logs={recentLogs} />
    </div>
    <div className="download-card">
  <h3>Downloads</h3>
  <button onClick={downloadAbuseLogs}>Download Abuse Logs</button>
  <button onClick={downloadBlockedUsers}>Download Blocked Users</button>
</div>
  </div>
);

};

export default AdminDashboard;
