import { Link, useLocation } from "react-router-dom";
import "./pages/admin/Admin.css";
import { NavLink } from "react-router-dom";


function Sidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
  <div className="sidebar-header">
    <h2>🛡️SafeTalk</h2>
  </div>

  <nav className="sidebar-menu">
    <NavLink to="/admin" end>Dashboard</NavLink>
    <NavLink to="/admin/abuse-logs">Abuse Log</NavLink>
    <NavLink to="/admin/blocked-users">Blocked Users</NavLink>
  </nav>
</div>

  );
}

export default Sidebar;
