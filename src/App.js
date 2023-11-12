import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import DashboardProducts from "./pages/dashboard/Products";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { CartProvider } from "./CartContext";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import Successful from "./pages/Successful";
import AuthContextProvider from "./AuthContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/Cart",
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: "/checkout",
    element: (
      <>
        <Header />
        <Checkout />
      </>
    ),
  },
  {
    path: "/successful",
    element: (
      <>
        <Header />
        <Successful />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/products",
    element: <DashboardProducts />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    // check if cart in local storage
    const cart = localStorage.getItem("cart");
    if (cart) {
      // set cart context
      setCart(JSON.parse(cart));
    } else {
      // set cart context
      setCart([]);
    }
  }, []);

  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
