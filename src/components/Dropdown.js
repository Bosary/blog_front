import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

export default function Dropdown() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleProfile = () => {
    setOpen(!open);

    navigate("/profile");
  };

  const handleLogout = () => {
    setOpen(!open);

    localStorage.clear();
    setUser(null);

    navigate("/");
  };

  return (
    <div className="anchor">
      <button onClick={handleOpen}>
        {user} <span>&#8693;</span>
      </button>
      {open && (
        <div className="dropdown">
          <ul>
            <li>
              <button onClick={handleProfile}>Profile</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
