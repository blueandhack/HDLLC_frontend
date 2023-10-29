import { useCallback, useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";

function Products() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [showProductForm, setShowProductForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const getProduct = useCallback(async () => {
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
    // console.log(data);
    setProducts(data.data);
    setTotal(data.total);

    setLoading(false);
  }, [pageIndex, pageSize, currentDate]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const onClose = () => {
    setShowProductForm(false);
  };

  return (
    <div className="App">
      {showProductForm && (
        <ProductForm
          onClose={onClose}
          getProduct={getProduct}
          setCurrentDate={setCurrentDate}
          currentProduct={currentProduct}
          isEdit={isEdit}
        />
      )}
      <h1 class="text-3xl font-bold">Products</h1>

      {/* add new product, pop up product form */}
      <div className="mx-auto p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsEdit(false);
            setCurrentProduct(null);
            setShowProductForm(true);
          }}
        >
          Add New Product
        </button>
      </div>

      {/* add refresh button */}
      <div className="mx-auto p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCurrentDate(Date.now());
          }}
        >
          Refresh
        </button>
      </div>

      {/* create a table to show products using tailwind */}
      <div className="mx-auto p-4">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <td class="border px-4 py-2">{product.name}</td>
                  <td class="border px-4 py-2">{product.price}</td>
                  <td class="border px-4 py-2">{product.description}</td>
                  <td class="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setIsEdit(true);
                        setCurrentProduct(product);
                        setShowProductForm(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* create pagination */}
      <div className="mx-auto p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (pageIndex > 0) {
              setPageIndex(pageIndex - 1);
            }
          }}
        >
          Previous
        </button>
        <span className="mx-2">{pageIndex + 1}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (pageIndex < total / pageSize - 1) {
              setPageIndex(pageIndex + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
