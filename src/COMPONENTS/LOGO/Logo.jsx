import React from "react";
import brain from "../../ASSESTS/brain.png";
import "./Logo.css";

export const Logo = () => {
  return (
    <div className="logo px-2 py-1 ">
      <img alt="logo" src={brain} height={100} width={100} className="mt3" />
    </div>
  );
};
