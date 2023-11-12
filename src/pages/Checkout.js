import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  const { cartItems } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
      return;
    }
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/orders/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: [...cartItems] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartItems, navigate, token]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Checkout;
