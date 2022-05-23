import React, { useState } from "react";

import "./Image.css";

export const Image = (props) => {
  const [link, setlink] = useState("");

  const submit = (e) => {
    e.preventDefault();

    props.sub(link);
  };

  return (
    <div>
      <p className="tc f3">This is smartbrain project</p>
      <div className="center pa4 br3 shadow form">
        <input
          className="f5 pa2 w-80 container"
          type="text"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
        <button
          onClick={submit}
          className="w-20 dib ph3 pv2 f5 btn btn-outline-success bg-light-green"
        >
          DETECT
        </button>
        <button
          onClick={() => {
            props.setUrl("");
            setlink("");
          }}
          type="button"
          className="close w-10 btn btn-danger tc"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <h4>&times;</h4>
          </span>
        </button>
      </div>
    </div>
  );
};
