import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  // Filter products
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  return (
    <div className="container">
      <h1 style={{ color: "black", padding: "10px" }}>
        Fake Store
      </h1>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <div className="product-container">
        {filteredProducts.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="price">${item.price}</p>
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;