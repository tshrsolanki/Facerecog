import React from "react";

export const Navigation = (props) => {
  let a = {
    display: "flex",
    justifyContent: "flex-end",
  };
  return (
    <nav style={a} className="py-2 px-2">
      <button
        onClick={() => {
          props.setSign("sign");
          props.setUrl("");
        }}
        className="btn-outline-warning btn mx-1 my-1 underline f6 db black link hover-black "
      >
        SIGN OUT
      </button>
    </nav>
  );
};
