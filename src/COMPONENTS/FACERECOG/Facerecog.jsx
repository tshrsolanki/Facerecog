import React from "react";
import "./Facerecog.css";
import { useSelector } from "react-redux";
export const Facerecog = () => {
  const { url, box } = useSelector((state) => {
    return { url: state.url, box: state.box };
  });

  let b = {
    width: "500px",
    height: "auto",
  };

  return (
    <div className="center ma">
      {"".length ? (
        <h3 className="my-4  message">{""}</h3>
      ) : (
        <>
          <div className="relative">
            <img id="input" src={url} style={b} alt="" />
            {box.map((data, i) => {
              return (
                <div
                  key={i}
                  className="bb tc"
                  style={{
                    top: data.topRow,
                    right: data.rightCol,
                    bottom: data.bottomRow,
                    left: data.leftCol,
                  }}
                ></div>
              );
            })}
          </div>
          <div className="py-3"></div>
        </>
      )}
    </div>
  );
};
