import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../utils/getToken";
import env from "react-dotenv";

export default function CreateComment(props) {
  const token = getToken();
  const params = useParams();
  const postId = params.postId;

  const [content, setContent] = useState();

  const submit = async (e) => {
    e.preventDefault();

    const url = `${env.API_URL}/posts/${postId}/new_comment`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(url, { content, postId }, config);

    setContent("");
    props.func();
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

        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}
