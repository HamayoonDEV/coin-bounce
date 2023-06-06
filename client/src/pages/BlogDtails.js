import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CommentList from "../compnents/CommentList";
import Loader from "../compnents/Loader";
import {
  getBlogById,
  deleteBlog,
  postComment,
  getCommentsById,
} from "../api/internal";
import "./BlogDetails.css";

const BlogDtails = () => {
  const [blogs, setBlogs] = useState([]);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    async function getBlogsDetails() {
      const commentResponse = await getCommentsById(blogId);
      if (commentResponse.status === 200) {
        setComment(commentResponse.data.data);
      }
      const blogRespose = await getBlogById(blogId);
      if (blogRespose.status === 200) {
        //setOwner ship
        setOwnsBlog(username === blogRespose.data.blog.authorUsername);

        setBlogs(blogRespose.data.blog);
      }
    }
    getBlogsDetails();
  }, [reload]);

  const postCommenthandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    };
    const response = await postComment(data);
    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };

  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);
    if (response.status === 200) {
      navigate("/");
    }
  };

  if (blogs.length === 0) {
    return <Loader text="blog details" />;
  }

  return (
    <div className="detailsWrapper">
      <div className="left">
        <h1 className="title">{blogs.title}</h1>
        <div className="meta">
          <p>
            @{blogs.authorUsername} on {new Date(blogs.createdAt).toString()}
          </p>
        </div>
        <div className="photo">
          <img src={blogs.photo} width={250} height={250} />
        </div>
        <p className="content">{blogs.content}</p>

        {ownsBlog && (
          <div className="controls">
            <button
              className="editButton"
              onClick={() => {
                navigate(`/blog/update/${blogs._id}`);
              }}
            >
              Edit
            </button>
            <button className="deleteButton" onClick={deleteBlogHandler}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="right">
        <div className="commentWrapper">
          <CommentList comments={comment} />
          <div className="postComment">
            <input
              className="input"
              placeholder="comment goes here...."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="postCommentButton" onClick={postCommenthandler}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDtails;
