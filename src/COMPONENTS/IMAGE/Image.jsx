import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImageRecogData,
  setEmptyBox,
  setMessage,
  setUrl,
} from "../../ACTIONS/actions";
import "./Image.css";

export const Image = () => {
  const [link, setlink] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const submit = () => {
    if (!link) return;
    dispatch(setUrl(link));
    dispatch(fetchImageRecogData(link, userData.id));
  };
  const emptyData = () => {
    dispatch(setUrl(""));
    dispatch(setEmptyBox());
    setlink("");
    dispatch(setMessage(""));
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
          className="w-20 dib ph3 pv2 f5 btn btn-outline-success detect"
        >
          DETECT
        </button>
        <button
          onClick={() => {
            emptyData();
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
