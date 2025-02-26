import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="content icons-container">
        <Link
          className="icon-link"
          target="_blank"
          to="https://github.com/JasonChou0105"
        >
          <i className="fab fa-github icon"></i>
        </Link>
        <Link
          className="icon-link"
          target="_blank"
          to="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvmXxjnmwhQjBHnKGZkqDKCJWFnwRLtKZzQfrNKsMCmFnmNBQQdTWxrTNFWNHPmrsqgpNB"
        >
          <i className="fas fa-envelope icon"></i>
        </Link>
      </div>
      <div className="content copyright-container">
        Made by{" "}
        <Link className="link-text" target="_blank" to="https://github.com/Sudhan-Dahake">
          Sudhan Dahake
        </Link>
        ,{" "}
        <Link className="link-text" target="_blank" to="https://github.com/jasonchou0105">
          Jason Chout
        </Link>
        ,{" "}
        <Link className="link-text" target="_blank" to="https://linktr.ee/vedant.sheel">
          Vedant Sheel
        </Link>
        ,{" "}
        <Link className="link-text" target="_blank" to="https://github.com/BrianZhao10">
          Brian Zhao
        </Link>
      </div>
      <div className="desc-text content">
        Made with{" "}
        <Link className="link-text" target="_blank" to="https://react.dev/">
          React.js
        </Link> and <Link className="link-text" target="_blank" to="https://fastapi.tiangolo.com/">
          Fast API
        </Link>
      </div>
    </div>
  );
}

export default Footer;
