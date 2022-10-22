import React from "react";

export default function Post(props) {
  const post = props.post;
  return (
    <div>
      <h2>{post.title}</h2>

      <img src={post.imageUrl} alt="post body" width="700" height="500" />

      <p>Comments: {post.commentsCount}</p>
    </div>
  );
}
