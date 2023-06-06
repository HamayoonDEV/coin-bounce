import React from "react";
import "./Error.css";

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="errorWrapper">
      <div className="errorHeader">Error 404 -- page not found</div>
      <div className="errorBody">
        Go back to{" "}
        <Link className="errorHomeLink" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
