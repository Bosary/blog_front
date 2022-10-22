import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import env from "react-dotenv";

export default function Signup() {
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    let url = `${env.API_URL}/users/signup`;
    let response = await axios.post(url, { username, password });

    // Login
    url = `${env.API_URL}/users/login`;
    response = await axios.post(url, { username, password });

    const token = JSON.stringify(response.data.token);
    localStorage.setItem("token", token);

    setUser(username);

    navigate("/", { state: { message: "SignUp Successful" } });
  };

  return (
    <div>
      <form className="signup">
        <h2>Sign Up</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
            minLength={1}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            minLength={3}
          />
        </div>
        <button onClick={submit}>Sign Up</button>
      </form>
    </div>
  );
}
