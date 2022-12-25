import React from "react";
import { useSelector } from "react-redux";

export const Rank = () => {
  const { userData } = useSelector((state) => state);
  return (
    <>
      <div className="white f3 tc">{userData.name}, you have detected</div>
      <div className="white f3 tc">#{userData.entries} images</div>
    </>
  );
};
