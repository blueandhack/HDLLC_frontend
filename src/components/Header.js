import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Header() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const { token, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <a href="/products">Products</a>
        <Link to="/cart">
          Cart ({cartItems.length}, ${getCartTotal().toFixed(2)})
        </Link>
        {token && (
          <span
            className="cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </span>
        )}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}
      </div>
    </div>
  );
}

export default Header;
