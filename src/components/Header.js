import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="Doge" />
      <h1>Blog</h1>
      <span>
        Temp: <Link to="/dev_notes">Dev Notes</Link>
      </span>
    </header>
  );
}
