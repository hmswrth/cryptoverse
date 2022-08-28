import React from "react";
import { Spin } from "antd";
import Lottie from "react-lottie-player";
import loadingAnimation from "../assets/loadingAnimation.json";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        style={{ height: "50%", width: "50%" }}
        animationData={loadingAnimation}
        play
        loop
      />
    </div>
  );
}

export default Loader;
