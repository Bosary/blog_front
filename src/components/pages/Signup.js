import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const url = `${window.env.API_URL}/users/signup`;
    const response = await axios.post(url, { username, password });

    const token = JSON.stringify(response.data.token);
    localStorage.setItem("token", token);

    navigate("/", { state: { message: "SignUp Successful" } });
  };

  return (
    <form onSubmit={submit}>
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
      <button type="submit">Submit</button>
    </form>
  );
}
