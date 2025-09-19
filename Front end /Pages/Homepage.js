import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <Link to={`/product/${p._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
