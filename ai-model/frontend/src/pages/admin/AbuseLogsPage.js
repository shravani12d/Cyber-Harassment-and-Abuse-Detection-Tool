import AbuseLogsTable from "./AbuseLogsTable";
import "./Admin.css";

function AbuseLogsPage() {
  return (
    <div className="admin-container">
      <h2>Abuse Evidence</h2>

      <div className="admin-card">
        <AbuseLogsTable />
      </div>
    </div>
  );
}

export default AbuseLogsPage;
