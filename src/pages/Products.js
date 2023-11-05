import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:3001/products?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${currentDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setProducts(data.data);
    setTotal(data.total);

    setLoading(false);
  }, [pageIndex, pageSize, currentDate]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <h1 class="text-3xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => {
          return (
            <div className="border-2 border-gray-300 p-4">
              <div className="h-48 bg-gray-300"></div>
              <div className="text-lg font-bold">{product.name}</div>
              <div className="text-sm">{product.description}</div>
              <div className="text-lg font-bold">${product.price}</div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  // window.location.replace(`/product/${product._id}`);
                }}
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
