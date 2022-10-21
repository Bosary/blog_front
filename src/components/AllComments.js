import React from "react";

export default function AllComments(props) {
  const comments = props.comments;

  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <div className="comment" key={comment._id}>
              <div>
                <h4>{comment.author.username}</h4>
              </div>
              <div className="content">{comment.content}</div>
            </div>
          );
        })}
    </div>
  );
}
