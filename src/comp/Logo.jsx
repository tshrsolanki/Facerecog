import React from "react";
import b from "./brain.png";
import Tilt from "react-tilt";
import "./Logo.css";

export const Logo = () => {
  let a = {
    height: 125,
    width: 125,
  };
  return (
    <div className="container px-2 py-1">
      <Tilt className="Tilt bt2 shadow-2" options={{ max: 55 }} style={a}>
        <div className="Tilt-inner tc py-4 ">
          <img alt="logo" src={b} />
        </div>
      </Tilt>
    </div>
  );
};
