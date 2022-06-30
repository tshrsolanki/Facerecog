import React from "react";

export const Rank = (props) => {
  return (
    <>
      <div className="white f3 tc">{props.name}, you have detected</div>
      <div className="white f3 tc">#{props.rank} images</div>
    </>
  );
};
