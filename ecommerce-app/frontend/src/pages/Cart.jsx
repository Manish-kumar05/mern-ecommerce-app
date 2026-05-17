import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );
  const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/orders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order placed successfully");

    fetchCart();

  } catch (error) {
    console.log(error);
    alert("Failed to place order");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2>No items in cart</h2>
      ) : (
        <>
          <div className="grid gap-4">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">
                    {item.product.name}
                  </h2>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <h3 className="text-green-600 font-bold">
                    ₹ {item.product.price}
                  </h3>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">
              Total: ₹ {totalPrice}
            </h2>

            <button
  onClick={placeOrder}
  className="bg-black text-white px-6 py-3 rounded mt-4"
>
  Checkout
</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;