import React, { useEffect, useState } from "react";
import axios from "axios";

const BlockHistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/block-history")
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Block History</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>Blocked</td>
              <td>
                {new Date(item.blockedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockHistoryTable;