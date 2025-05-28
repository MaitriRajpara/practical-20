import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddProductClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onAddProductClick,
}) => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/add-product"); 
  };
  
  return (
    <nav className="navbar">
      <div className="logo">MyLogo</div>
      <div className="nav-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
        <button className="add-btn" onClick={onAddProductClick || handleAddProductClick}>
          Add Product
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
