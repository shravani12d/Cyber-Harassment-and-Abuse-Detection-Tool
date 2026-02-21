import Sidebar from "../../Sidebar";
import { Outlet } from "react-router-dom";
import "./Admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
