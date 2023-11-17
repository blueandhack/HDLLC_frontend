import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const login = async (email, password) => {
    // make API call to authenticate user
    // if successful, set token in state
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (data.message === "success") {
      setToken(data.token);
      return true;
    } else {
      return false;
    }
  };

  const signup = (email, password) => {
    // make API call to create new user account
    // if successful, set token in state
    setToken("example_token");
  };

  const logout = () => {
    // remove token from state and local storage
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
