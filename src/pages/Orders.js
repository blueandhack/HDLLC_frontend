import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [currentDate, setCurrentDate] = useState(Date.now());

  const { token } = useContext(AuthContext);

  const getOrders = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3001/orders?pageIndex=${pageIndex}&pageSize=${pageSize}&date=${currentDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setOrders(data.data);
    setTotalItems(data.totalItems);
    setLoading(false);
  }, [pageIndex, pageSize, currentDate, token]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <h1>Orders</h1>
      {/* render orders with tailwind css */}
      <div className="grid grid-cols-3 gap-4">
        {orders.map((order) => {
          return (
            <div className="border-2 border-gray-300 p-4">
              <div className="text-lg font-bold">
                Order ID: {order._id.slice(0, 6)}
              </div>
              <div className="text-sm">
                {order.items.map((item) => {
                  return (
                    <div>
                      {item.name} X {item.quantity} - $
                      {item.price * item.quantity}
                    </div>
                  );
                })}
              </div>
              <div className="text-lg font-bold">
                Total: ${order.amount / 100}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <div className="flex">
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (pageIndex * pageSize + pageSize < totalItems) {
                setPageIndex(pageIndex + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
