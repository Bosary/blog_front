import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="Doge" />

      <h1>Blog</h1>
    </header>
  );
}
