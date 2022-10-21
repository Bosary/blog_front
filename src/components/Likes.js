import axios from "axios";
import React, { useState } from "react";

export default function Likes(props) {
  const likes = props.likes;
  const postId = props.postId;

  const [count, setCount] = useState(likes);

  async function increaseLikes(e) {
    e.currentTarget.disabled = true;
    setCount(count + 1);

    const url = `${window.env.API_URL}/posts/${postId}/like`;
    await axios.put(url, postId);
  }

  return (
    <button className="likes" onClick={increaseLikes}>
      &hearts; {count} &hearts;
    </button>
  );
}
