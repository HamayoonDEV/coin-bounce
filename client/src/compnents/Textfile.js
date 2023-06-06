import React from "react";
import "./Textfile.css";

const Textfile = (props) => {
  return (
    <div className="textFile">
      <input {...props} />
      {props.error && <p className="errorMessage">{props.errormessage}</p>}
    </div>
  );
};

export default Textfile;
