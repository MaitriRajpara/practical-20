import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./product.css";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct
} from "../Api/ProductApi";
import type { ProductType } from "../Api/ProductApi"

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch {
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    } catch {
      alert("Failed to delete product");
    }
  };

  // Sort and search filtering
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      } else {
        return Number(a.price) - Number(b.price);
      }
    });

  const handleEdit = (id: string) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={(val) => setSortBy(val as "name" | "price")}
      />
      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>
                <strong>₹{product.price}</strong>
              </p>

              <div className="card-buttons">
                <Link
                  to={`/products/edit/${product.id}`}
                  className="edit-button"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Product;
