import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    await API.post(
      "/cart",
      {
        productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product added to cart");
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed to add to cart");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="bg-black text-white p-4 flex justify-between items-center">
  <h1 className="text-2xl font-bold">E-Commerce Store</h1>

  <div className="flex gap-4">
    <a href="/" className="hover:text-gray-300">Home</a>
    <a href="/login" className="hover:text-gray-300">Login</a>
    <a href="/register" className="hover:text-gray-300">Register</a>
    <a href="/cart" className="hover:text-gray-300">Cart</a>
    <a href="/orders" className="hover:text-gray-300">Orders</a>
  </div>
</nav>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <img
              src={
                product.image ||
                "https://via.placeholder.com/300"
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="text-xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>

            <h3 className="text-green-600 text-xl font-bold mt-3">
              ₹ {product.price}
            </h3>

            <button
  onClick={() => addToCart(product._id)}
  className="bg-black text-white w-full py-2 rounded-lg mt-4 hover:bg-gray-800"
>
  Add to Cart
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;