import React, { useState } from "react";
import getToken from "../../utils/getToken";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";

export default function CreatePost() {
  const token = getToken();

  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [title, setTitle] = useState("");

  const [fileError, setFileError] = useState("");
  const [titleError, setTitleError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      // reset errors
      setFileError("");
      setTitleError("");

      // API call
      const url = `${env.API_URL}/posts/new_post/`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false,
      };

      await axios.post(url, formData, config);

      navigate("/");
    } catch (error) {
      const status = error.response.status;
      if (status === 400) {
        handleError(error.response.data);
      } else {
        navigate("/fail");
      }
    }
  };

  const handleError = (errors) => {
    for (const error of errors) {
      if (error.param === "title") {
        setTitleError(error.msg);
      }
      if (error.param === "file") {
        setFileError(error.msg);
      }
    }
  };

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
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
        <form className="new_post">
          <h2>New Post</h2>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={1}
            />
            {titleError && <p className="error">*{titleError}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={fileSelected}
              required={true}
            />
            {fileError && <p className="error">*{fileError}</p>}
          </div>

          <button onClick={submit}>Submit</button>
        </form>
      )}
    </div>
  );
}
