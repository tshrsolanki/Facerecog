import React from "react";
import { Logo } from "../LOGO/Logo";
import { ProfileIcon } from "../PROFILEICON/ProfileIcon";

export const Navigation = (props) => {
  let a = {
    display: "flex",
    justifyContent: "space-between",
  };
  return (
    <>
      <nav style={a} className="py-2 px-2">
        <Logo />
        <ProfileIcon />
      </nav>
    </>
  );
};
