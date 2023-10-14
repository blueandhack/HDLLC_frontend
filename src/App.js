import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  const [showDashboard, setShowDashboard] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    // call login api
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      // redirect to dashboard
      localStorage.setItem("token", data.token);
      setShowDashboard(true);
      setPassword("");
    }
  };

  const checkToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3001/currentUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setShowDashboard(true);
      setUsername(data.username);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return <div className="App">{/* <h1>Loading...</h1> */}</div>;
  }

  if (showDashboard) {
    return (
      <div className="App">
        <h1>Dashboard</h1>

        <h2>Welcome {username}</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setShowDashboard(false);
            setUsername("");
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <div
        style={{
          margin: "auto",
          padding: "10px",
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
      </div>
      <div
        style={{
          margin: "auto",
          padding: "10px",
        }}
      >
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>
      <div
        style={{
          margin: "auto",
          padding: "10px",
        }}
      >
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
