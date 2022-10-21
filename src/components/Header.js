import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Doge" width="100" height="100" />
      </div>
      <h1>Blog</h1>
    </div>
  );
}
