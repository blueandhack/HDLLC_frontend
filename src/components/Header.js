import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Header() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <a href="/products">Products</a>
        <Link to="/cart">
          Cart ({cartItems.length}, ${getCartTotal().toFixed(2)})
        </Link>
        {token && token !== "null" && (
          <>
            <Link to="/orders">Orders</Link>
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
                logout();
              }}
            >
              Logout
            </span>
          </>
        )}
        {(!token || token === "null") && <Link to="/login">Login</Link>}
        {(!token || token === "null") && <Link to="/signup">Signup</Link>}
      </div>
    </div>
  );
}

export default Header;
