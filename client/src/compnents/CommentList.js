import React from "react";

import Comment from "./Comment";
import "./CommentList.css";

const CommentList = ({ comments }) => {
  return (
    <div className="commentListWrapper">
      <div className="commentList">
        {comments.length == 0 ? (
          <div className="noComment">No Comments posted</div>
        ) : (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
