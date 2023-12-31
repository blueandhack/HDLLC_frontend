import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { token, login: loginFunc } = useContext(AuthContext);

  const login = async () => {
    loginFunc(email, password);
  };

  useEffect(() => {
    if (token !== null && token !== "null") {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold">Login</h1>
      </div>
      <div className="mx-auto p-4">
        <input
          type="text"
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Email"
        />
      </div>
      <div className="mx-auto p-4">
        <input
          type="password"
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Password"
        />
      </div>
      <div className="mx-auto p-4">
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      </div>
      <div className="text-center">
        <Link to="/signup" className="text-indigo-600 hover:text-indigo-700">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
