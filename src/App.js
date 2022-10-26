import React from "react";
import Navbar from "./components/Navbar";
import RouteSwitch from "./RouteSwitch";
import getToken from "./utils/getToken";

export default function App() {
  getToken(); // Check expiration
  return (
    <main>
      <Navbar />
      <RouteSwitch />
    </main>
  );
}
