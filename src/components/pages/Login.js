import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

export default function Login() {
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const url = `${window.env.API_URL}/users/login`;
      const response = await axios.post(url, { username, password });

      if (response.status === 200) {
        const token = JSON.stringify(response.data.token);
        localStorage.setItem("token", token);

        setUser(username);
        navigate("/", { state: { message: "Login Successful" } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login">
      <h2>Login</h2>
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
      <button onClick={submit}>Log In</button>
    </form>
  );
}
