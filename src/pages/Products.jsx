import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [category, search, products]);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="loading-text">Loading premium products...</p>
    </div>
  );

  if (error) return <div className="error container"><h2>{error}</h2></div>;

  return (
    <div className="main-content">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Premium Collection</h1>
          <p className="page-subtitle">Discover our curated selection of high-quality products</p>
        </header>

        <div className="filters-container">
          <div className="search-box">
            <span class="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-info">
          Showing {filtered.length} of {products.length} products
        </div>

        <div className="grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;