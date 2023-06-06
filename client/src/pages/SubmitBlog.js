import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { submitBlog } from "../api/internal";
import "./SubmitBlog.css";
import Textfile from "../compnents/Textfile";

const SubmitBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const author = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };
  const submitHandler = async () => {
    const data = {
      title,
      author,
      content,
      photo,
    };
    const response = await submitBlog(data);
    if (response.status == 201) {
      return navigate("/");
    }
  };
  return (
    <div className="wrapper">
      <div className="header"> Create a blog!</div>
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
      {photo !== "" ? <img src={photo} width={150} height={150} /> : ""}
      <button
        className="submitButton"
        onClick={submitHandler}
        disabled={title === "" || content === "" || photo === ""}
      >
        submit
      </button>
    </div>
  );
};

export default SubmitBlog;
