import React from "react";
import DOMPurify from "dompurify";

export default function Author(props) {
  const username = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  return (
    <div>
      <h4 dangerouslySetInnerHTML={sanitizedData(username)} />
    </div>
  );
}
