import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Blog.css";
import Loader from "../compnents/Loader";
import { getAllblogs } from "../api/internal";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    //IIFE
    (async function getAllBlogsApiCalls() {
      const response = await getAllblogs();

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    })();

    //clean up
    setBlogs([]);
  }, []);
  if (blogs.length == 0) {
    return <Loader text="Blogs" />;
  }

  return (
    <div className="blogWrapper">
      {blogs.map((blog) => (
        <div
          id={blog._id}
          className="blog"
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          <h2>{blog.title}</h2>
          <img src={blog.photo} />
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
