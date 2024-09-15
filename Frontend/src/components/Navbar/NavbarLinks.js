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
        <div className="navbar-section-link-container">Search</div>
      </Link>
      <Link className="navbar-section-link" to="/add" onClick={closeMobileMenu}>
        <div className="navbar-section-link-container">Add</div>
      </Link>
      <Link className="navbar-section-link" onClick={closeMobileMenu}>
        <div className="navbar-section-link-container">Test2</div>
      </Link>
      <Link className="navbar-section-link" onClick={closeMobileMenu}>
        <div className="navbar-section-link-container">Test3</div>
      </Link>
    </>
  );
}

export default NavbarLinks;
