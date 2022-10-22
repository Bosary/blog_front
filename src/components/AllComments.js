import React from "react";
import DOMPurify from "dompurify";

export default function AllComments(props) {
  const comments = props.comments;
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <div className="comment" key={comment._id}>
              <div>
                <h4
                  dangerouslySetInnerHTML={sanitizedData(
                    comment.author.username
                  )}
                />
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={sanitizedData(comment.content)}
              />
            </div>
          );
        })}
    </div>
  );
}
