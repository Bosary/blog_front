import React from "react";
import DOMPurify from "dompurify";

export default function Author(props) {
  const username = props.name;
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  return (
    <div>
      <h4 dangerouslySetInnerHTML={sanitizedData(username)} />
    </div>
  );
}
