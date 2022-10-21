import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* Components */
import Author from "../Author";
import Post from "../Posts";
import Likes from "../Likes";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const result = await axios.get(`${window.env.API_URL}/posts/`);
      setPosts(result.data.posts);
    }
    getPosts();
  }, []);

  return (
    <div>
      <div className="container">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <Author name={post.author.username} />
            <Link to={`post/${post._id}`} state={{ id: post._id }}>
              <Post post={post} />
            </Link>
            <Likes likes={post.likes} postId={post._id} />
            <p className="border"></p>
          </div>
        ))}
      </div>
    </div>
  );
}
