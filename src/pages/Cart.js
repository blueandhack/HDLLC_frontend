import { useEffect, useContext } from "react";
import { CartContext } from "../CartContext";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>
      <div className="flex flex-col items-center justify-center">
        {cartItems.length === 0 && (
          <div className="text-xl font-bold">Cart is empty</div>
        )}
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center justify-center my-4"
          >
            <div className="text-lg font-bold">{item.name}</div>
            <div className="flex items-center justify-center mt-2">
              <button
                className="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addToCart(item)}
              >
                +
              </button>
              <button
                className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeFromCart(item)}
              >
                -
              </button>
            </div>
            <div className="mt-2">
              {item.quantity} X ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr className="my-4" />
            <div className="text-xl font-bold">
              Total: ${getCartTotal().toFixed(2)}
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
        {/* checkout button */}
        <button
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            alert("Checkout not implemented yet");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
