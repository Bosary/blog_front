import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav>
      <Link to={"/"}>Home</Link>

      <Link to={"new_post"}>New post</Link>

      {user ? <LoggedIn /> : <NotLoggedIn />}
    </nav>
  );
}

function NotLoggedIn() {
  return (
    <div>
      <Link to={"signup"}>Sign Up</Link> / <Link to={"login"}>Log In</Link>
    </div>
  );
}

function LoggedIn() {
  return <Dropdown />;
}
