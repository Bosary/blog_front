import React, { useState } from "react";
import getToken from "../../utils/getToken";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const token = getToken();

  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    const url = `${window.env.API_URL}/posts/new_post/`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    };

    await axios.post(url, formData, config);

    navigate("/");
  };

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="createPost">
      {!token && (
        <p className="alert">
          You need to be logged in to create a new post. Please{" "}
          <Link to={"../login"}>Log In</Link> to your account or
          <Link to={"../signup"}>Sign Up</Link>
        </p>
      )}

      {token === "expired" && (
        <p className="alert">
          Sorry, you're session has expired. Please{" "}
          <Link to={"../login"}>Log In</Link> again.
        </p>
      )}

      {token && token !== "expired" && (
        <form onSubmit={submit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
              minLength={1}
            />
          </div>
          <div>
            <label>URL:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={fileSelected}
              required={true}
            />
          </div>

          <input type="submit" name="new post" />
        </form>
      )}
    </div>
  );
}
