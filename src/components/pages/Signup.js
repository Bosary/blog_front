import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { useName } from "../../utils/NameProvider";

export default function Signup() {
  const { setUser } = useName();

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
      let url = `${env.API_URL}/users/signup`;
      let response = await axios.post(url, {
        username: username.toLowerCase(),
        password,
      });

      // Login
      url = `${env.API_URL}/users/login`;
      response = await axios.post(url, {
        username: username.toLowerCase(),
        password,
      });

      const token = JSON.stringify(response.data.token);
      localStorage.setItem("token", token);

      localStorage.setItem("username", username);

      setUser(username);

      navigate("/", { state: { message: "SignUp Successful" } });
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

        <button onClick={submit}>Sign Up</button>
      </form>
    </div>
  );
}
