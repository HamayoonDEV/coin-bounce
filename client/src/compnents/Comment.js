import React from "react";

import "./Comment.css";

const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt).toDateString();
  return (
    <div className="comment">
      <div className="header">
        <div className="author">{comment.authorUsername}</div>
        <div className="date">{date}</div>
        <div className="commentContent">{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
