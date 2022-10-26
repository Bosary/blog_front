import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";

/* Components */
import Author from "../Author";
import Post from "../Posts";
import Likes from "../Likes";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      try {
        const result = await axios.get(`${env.API_URL}/posts/`);
        setPosts(result.data.posts);
        setLoading(false);
      } catch (errors) {
        console.log(errors);
        navigate("/fail");
      }
    }
    getPosts();
  }, []);

  return (
    <div className="container">
      {loading && <div className="loading">Loading</div>}
      {posts &&
        posts.map((post) => (
          <div className="post" key={post._id}>
            <Author name={post.author.username} />
            <Link to={`post/${post._id}`} state={{ id: post._id }}>
              <Post post={post} />
            </Link>
            <Likes likes={post.likes} postId={post._id} />
          </div>
        ))}
    </div>
  );
}
