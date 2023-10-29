import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Signup from "./Signup";
import Products from "./Products";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/products",
    element: <Products />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  const [showDashboard, setShowDashboard] = useState(false);

  const checkToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3001/currentUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      // current user context set
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
