import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <h2>No orders found</h2>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold">Order ID: {order._id}</h2>

              <p className="mt-2">
                Status:{" "}
                <span className="font-bold text-blue-600">
                  {order.status}
                </span>
              </p>

              <p className="font-bold text-green-600">
                Total: ₹ {order.totalPrice}
              </p>

              <div className="mt-3">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="border-t py-2">
                    <p>{item.product?.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹ {item.product?.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;