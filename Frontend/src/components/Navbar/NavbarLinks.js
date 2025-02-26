import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function NavbarLinks({ closeMobileMenu }) {
  return (
    <>
      <Link
        className="navbar-section-link"
        to="/search"
        onClick={closeMobileMenu}
      >
        <div className="navbar-section-link-container">Search For Item</div>
      </Link>
      <Link className="navbar-section-link" to="/add" onClick={closeMobileMenu}>
        <div className="navbar-section-link-container">Add Found Item</div>
      </Link>
    </>
  );
}

export default NavbarLinks;
