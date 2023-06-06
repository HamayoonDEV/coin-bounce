import React from "react";
import { TailSpin } from "react-loader-spinner";

import "./Loader.css";

const Loader = ({ text }) => {
  return (
    <div className="loaderWrapper">
      <h2>Loading {text}</h2>
      <TailSpin height={80} width={80} radius={1} color={"blue"} />
    </div>
  );
};

export default Loader;
