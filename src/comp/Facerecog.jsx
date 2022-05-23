import React from "react";
import "./Facerecog.css";

export const Facerecog = (props) => {
  let a = {
    top: props.box.topRow,
    right: props.box.rightCol,
    bottom: props.box.bottomRow,
    left: props.box.leftCol,
  };
  let b = {
    width: "500px",
    height: "auto",
  };

  return (
    <div className="center ma">
      {props.url === "invalid" ? (
        <h3 className="my-4">Invalid Url</h3>
      ) : (
        <>
          <div className="absolute">
            <img id="input" src={props.url} style={b} alt="" />
            <div className="bb tc" style={a}></div>
          </div>
          <div className="py-3"></div>
        </>
      )}
    </div>
  );
};
