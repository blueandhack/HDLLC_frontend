import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useContext } from "react";

function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState({});

  const { addToCart } = useContext(CartContext);

  const getProduct = useCallback(async () => {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    setProduct(data);
  }, [id]);

  useEffect(() => {
    // get product by id
    getProduct();
  }, [getProduct]);

  return (
    <div>
      {/* it has two columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* left side has default product picture */}
        <div className="p-4">
          {/* inside element align from right */}
          <div className="flex justify-end">
            <img
              src="https://via.placeholder.com/150"
              alt="product"
              className="h-48 w-48"
            />
          </div>
        </div>
        {/* right side shows product name, description, price, original price, add cart button, and others */}
        <div className="mx-auto p-4">
          <div className="text-3xl font-bold">{product.name}</div>
          <div className="text-lg font-bold">${product.price}</div>
          <div className="text-sm">
            Original Price: ${product.originalPrice}
          </div>
          <div className="text-sm">Description</div>
          <div>{product.description}</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              // add to cart
              addToCart({ ...product, quantity: 1 });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
