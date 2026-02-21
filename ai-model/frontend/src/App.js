import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import ChatPage from "./pages/chat/ChatPage";
import Navbar from "./components/Navbar";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AbuseLogsPage from "./pages/admin/AbuseLogsPage";
import BlockedUsersPage from "./pages/admin/BlockedUsersPage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="abuse-logs" element={<AbuseLogsPage />} />
        <Route path="blocked-users" element={<BlockedUsersPage />} />
        </Route>
        </Routes>
    </>
  );
}

export default App;
