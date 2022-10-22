import React from "react";
import DOMPurify from "dompurify";

export default function Post(props) {
  const post = props.post;
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  return (
    <div>
      <h2 dangerouslySetInnerHTML={sanitizedData(post.title)} />

      <img src={post.imageUrl} alt="post body" />

      <p>Comments: {post.commentsCount}</p>
    </div>
  );
}
