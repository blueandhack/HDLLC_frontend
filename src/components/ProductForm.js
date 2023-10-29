import React, { useEffect, useState } from "react";

function ProductForm({
  onClose,
  getProduct,
  setCurrentDate,
  currentProduct,
  isEdit,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [SKU, setSKU] = useState("");
  const [delivery, setDelivery] = useState("");
  const [faq, setFaq] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (isEdit) {
      setName(currentProduct.name);
      setPrice(currentProduct.price);
      setDescription(currentProduct.description);
      setOriginalPrice(currentProduct.originalPrice);
      setSKU(currentProduct.SKU);
      setDelivery(currentProduct.delivery);
      setFaq(currentProduct.faq);
      setCompanyName(currentProduct.companyName);
    }
  }, [isEdit, currentProduct]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      try {
        const response = await fetch(
          "http://localhost:3001/products/" + currentProduct._id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              price: price,
              description: description,
              originalPrice: originalPrice,
              SKU: SKU,
              delivery: delivery,
              faq: faq,
              companyName: companyName,
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        setCurrentDate(Date.now());
        onClose();
        getProduct();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            price: price,
            description: description,
            originalPrice: originalPrice,
            SKU: SKU,
            delivery: delivery,
            faq: faq,
            companyName: companyName,
          }),
        });

        const data = await response.json();
        console.log(data);

        setCurrentDate(Date.now());
        onClose();
        getProduct();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {/* using tailwind to create a pop up window with product form */}
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* center div block */}
        <div className="flex justify-center">
          {/* using tailwind to create a form include email and password inputs */}
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="originalPrice"
              >
                Original Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Original Price"
                name="originalPrice"
                value={originalPrice}
                onChange={(e) => {
                  setOriginalPrice(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="SKU"
              >
                SKU
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="SKU"
                name="SKU"
                value={SKU}
                onChange={(e) => {
                  setSKU(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="delivery"
              >
                Delivery
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Delivery"
                name="delivery"
                value={delivery}
                onChange={(e) => {
                  setDelivery(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="faq"
              >
                FAQ
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="FAQ"
                name="faq"
                value={faq}
                onChange={(e) => {
                  setFaq(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="companyName"
              >
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {isEdit ? "Update" : "Add"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
