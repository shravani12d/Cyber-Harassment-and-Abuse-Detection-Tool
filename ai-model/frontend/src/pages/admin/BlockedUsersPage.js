import BlockedUsersTable from "./BlockedUsersTable";
import "./Admin.css";
import BlockHistoryTable from "./BlockHistoryTable";

function BlockedUsersPage() {
  return (
    <div className="admin-container">
      <h2>Blocked Users</h2>

      <div className="admin-card">
        <BlockedUsersTable />
      </div>
      <div className="admin-card">
        <BlockHistoryTable />
      </div>
    </div>
  );
}

export default BlockedUsersPage;
