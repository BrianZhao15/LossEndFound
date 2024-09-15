import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import NavbarLinks from "./NavbarLinks";

function Navbar() {
  const [menuShown, setMenuShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState();

  function handleClick() {
    setMenuOpen(!menuOpen);
  }
  function closeMobileMenu() {
    setMenuOpen(false);
  }

  function showMenu() {
    if (window.innerWidth <= 1100) {
      setMenuShown(true);
    } else {
      setMenuShown(false);
      setMenuOpen(false);
    }
  }
  const handleScroll = () => {
    const targetScrollY = 24; // Change this to your specific scroll point
    if (window.scrollY > targetScrollY) {
      setNavbarScrolled(true);
    } else {
      setNavbarScrolled(false);
    }
  };

  useEffect(() => {
    showMenu();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  window.addEventListener("resize", showMenu);

  return (
    <div className={`navbar-root-container ${navbarScrolled && "scrolled"}`}>
      <div
        className={`navbar-container ${menuOpen && "active"} ${
          navbarScrolled && "scrolled"
        }`}
      >
        <div className="desktop-container">
          <Link className="navbar-logo-link" to="/" onClick={closeMobileMenu}>
            Home
          </Link>
          {!menuShown && (
            <div className="navbar-sections-links-container ">
              <NavbarLinks closeMobileMenu={closeMobileMenu} />
            </div>
          )}

          {!menuShown && (
            <Button
              location="/signup"
              buttonStyle="btn-primary"
              buttonSize="btn-meduim"
            >
              Sign Up/Log In
            </Button>
          )}
          <div className="menu-icon" onClick={handleClick}>
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
        {menuOpen && (
          <div
            className={`mobile-navbar-sections-links-container ${
              menuOpen && "active"
            }`}
          >
            <NavbarLinks closeMobileMenu={closeMobileMenu} />
            <Button
              location="/signup"
              buttonStyle="btn-primary"
              buttonSize="btn-meduim"
            >
              Sign Up/Log In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
