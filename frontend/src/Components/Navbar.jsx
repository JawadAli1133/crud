import React from "react";
import "./CSS/navbar.css";
const Navbar = ({onAddProductClick, onLogoutClick}) => {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-main">
          <div className="navbar-logo">
            <h1>Products</h1>
          </div>
          <div className="sidebar-button">
            <button onClick={onAddProductClick}>Add Product</button>
            <button onClick={onLogoutClick}>Log Out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;