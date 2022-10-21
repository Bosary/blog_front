import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import getToken from "../../utils/getToken";

/* Components */
import Author from "../Author";
import Post from "../Posts";
import Likes from "../Likes";
import CreateComment from "../CreateComment";
import AllComments from "../AllComments";

export default function SinglePost() {
  const token = getToken();

  const params = useParams();
  const id = params.postId;

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function getPost() {
      const result = await axios.get(`${window.env.API_URL}/posts/${id}`);
      setPost(result.data.post);
      setComments(result.data.comments);
    }
    getPost();
  }, [id, render]);

  if (post) {
    return (
      <div className="container">
        <div className="post">
          <Author name={post.author.username} />

          <Post post={post} />

          <Likes likes={post.likes} postId={post._id} />
        </div>

        <div className="sub">
          {!token && (
            <p className="alert">
              <Link to={"../../signup"}>Sign Up</Link> to leave a comment
            </p>
          )}

          {token === "expired" && (
            <p className="alert">
              Session expired. Please <Link to={"../../login"}>Log In</Link> to
              make a new comment
            </p>
          )}

          {token && token !== "expired" && <CreateComment func={setRender} />}

          <AllComments comments={comments} />
        </div>
      </div>
    );
  }
}
