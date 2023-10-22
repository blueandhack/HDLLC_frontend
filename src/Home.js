import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <h1 class="text-3xl font-bold">Home</h1>
      <div class="font-bold underline">
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Home;
