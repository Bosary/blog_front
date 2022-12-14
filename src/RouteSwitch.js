import { Routes, Route, Navigate } from "react-router-dom";

/* Pages */
import AllPosts from "./components/pages/AllPosts";
import SinglePost from "./components/pages/SinglePost";
import CreatePost from "./components/pages/CreatePost";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Fail from "./components/pages/Fail";
import Dev from "./components/pages/Dev";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new_post" element={<CreatePost />} />
      <Route path="/post/:postId" element={<SinglePost />} />
      <Route path="/fail" element={<Fail />} />
      <Route path="/dev_notes" element={<Dev />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouteSwitch;
