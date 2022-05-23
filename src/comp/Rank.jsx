import React from "react";

export const Rank = (props) => {
  return (
    <>
      <div className="white f3 tc">{props.name}, your current rank is</div>
      <div className="white f3 tc">#{props.rank}</div>
    </>
  );
};
