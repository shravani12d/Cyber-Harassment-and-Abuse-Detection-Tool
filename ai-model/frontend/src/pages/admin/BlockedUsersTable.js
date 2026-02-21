import React, { useEffect, useState } from "react";
import axios from "axios";

const BlockedUsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/blocked-users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Blocked Users</h3>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Username</th>
            <th>Reason</th>
            <th>Blocked On</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userId}</td>
              <td>{user.abuseCount >=3 ? "Reccuring abusive content": "-"}</td>
              <td>{new Date(user.blockedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockedUsersTable;
