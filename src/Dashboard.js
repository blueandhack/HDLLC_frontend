import React, { useState } from "react";

function Dashboard() {
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <h1>Dashboard</h1>

      <h2>Welcome {username}</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setUsername("");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
