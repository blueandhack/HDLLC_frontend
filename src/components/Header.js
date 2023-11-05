import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

function Header() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  return (
    <div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <a href="/products">Products</a>
        <Link to="/cart">
          Cart ({cartItems.length}, ${getCartTotal().toFixed(2)})
        </Link>
      </div>
    </div>
  );
}

export default Header;
