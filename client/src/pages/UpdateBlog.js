import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { updateBlog } from "../api/internal";
import { getBlogById, submitBlog } from "../api/internal";
import "./SubmitBlog.css";
import Textfile from "../compnents/Textfile";
import "./UpdateBlog.css";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };
  const author = useSelector((state) => state.user._id);
  const updateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        title,
        author,
        content,
        blogId,
      };
    } else {
      data = {
        title,
        author,
        content,
        photo,
        blogId,
      };
    }

    const response = await updateBlog(data);
    if (response.status == 200) {
      return navigate("/");
    }
  };

  useEffect(() => {
    async function getBlogsDetails() {
      const respose = await getBlogById(blogId);
      if (respose.status === 200) {
        setTitle(respose.data.blog.title);
        setContent(respose.data.blog.content);
        setPhoto(respose.data.blog.photo);
      }
    }
    getBlogsDetails();
  }, []);

  return (
    <div className="wrapper">
      <div className="header"> Update a blog!</div>
      <Textfile
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />
      <textarea
        className="content"
        placeholder="your content goes here..."
        maxLength={400}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="photo">
        <p>Choose a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg,image/jpeg,image/png"
          onChange={getPhoto}
        />
      </div>
      <img src={photo} width={150} height={150} />
      <button className="submitButton" onClick={updateHandler}>
        Update
      </button>
    </div>
  );
};

export default UpdateBlog;
