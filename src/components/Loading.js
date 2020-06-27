import React from "react";
import loadingGif from "../img/loading.gif"

const Loading = () => {
  return (
    <div>
      <img className="loading-gif" src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;
