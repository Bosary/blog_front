import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles.css";
import { NameProvider } from "./utils/NameProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NameProvider>
    <HashRouter>
      <Header />
      <App />
      <Footer />
    </HashRouter>
  </NameProvider>
);
