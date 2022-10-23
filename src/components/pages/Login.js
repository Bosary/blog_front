import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import env from "react-dotenv";

export default function Login() {
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      // reset errors
      setUsernameError("");
      setPasswordError("");

      // API call
      const url = `${env.API_URL}/users/login`;
      const response = await axios.post(url, { username, password });

      if (response.status === 200) {
        const token = JSON.stringify(response.data.token);
        localStorage.setItem("token", token);

        setUser(username);
        navigate("/", { state: { message: "Login Successful" } });
      }
    } catch (errors) {
      const status = errors.response.status;

      if (status === 400) {
        handleErrors(errors.response.data);
      } else {
        navigate("/fail");
      }
    }
  };

  const handleErrors = (errors) => {
    for (const error of errors) {
      if (error.param === "username") {
        setUsernameError(error.msg);
      }
      if (error.param === "password") {
        setPasswordError(error.msg);
      }
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
        {usernameError && <p className="error">*{usernameError}</p>}
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
        {passwordError && <p className="error">*{passwordError}</p>}
      </div>
      <button onClick={submit}>Log In</button>
    </form>
  );
}
