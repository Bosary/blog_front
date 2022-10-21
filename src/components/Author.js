import React from "react";

export default function Author(props) {
  const username = props.name;

  return (
    <div>
      <h4>{username}</h4>
    </div>
  );
}
