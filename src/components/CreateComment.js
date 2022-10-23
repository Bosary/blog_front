import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../utils/getToken";
import env from "react-dotenv";

export default function CreateComment(props) {
  const token = getToken();
  const params = useParams();
  const postId = params.postId;
  const navigate = useNavigate();

  const [content, setContent] = useState();

  const [contentError, setContentError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      // reset error
      setContentError("");

      // API call
      const url = `${env.API_URL}/posts/${postId}/new_comment`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(url, { content, postId }, config);

      setContent("");
      props.func();
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
      if (error.param === "content") {
        setContentError(error.msg);
      }
    }
  };

  return (
    <div>
      <form className="new_comment">
        <label>Leave a comment:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required={true}
          minLength={1}
          maxLength={500}
        ></textarea>
        {contentError && <p className="error">{contentError}</p>}
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}
