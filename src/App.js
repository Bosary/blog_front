import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import RouteSwitch from "./RouteSwitch";

export default function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <RouteSwitch />
      <Footer />
    </div>
  );
}
