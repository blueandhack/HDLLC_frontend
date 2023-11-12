import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Home</h1>
      {token && <div className="text-xl font-bold">Welcome!</div>}
      {!token && (
        <div>
          <div className="font-bold underline">
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
