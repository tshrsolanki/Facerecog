import React, { useState, useEffect } from "react";
import { Navigation } from "./comp/Navigation";
import { Logo } from "./comp/Logo";
import { Image } from "./comp/Image";
import { Rank } from "./comp/Rank";
import { Facerecog } from "./comp/Facerecog";
import { Signin } from "./comp/Signin";
import { Register } from "./comp/Register";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [box, setBox] = useState([]);
  const [sign, setSign] = useState("sign");
  const [user, setuser] = useState([]);

  const display = (b) => {
    setBox(b);
  };
  const calculateFl = (res) => {
    const clarfaiim = res.outputs[0].data.regions[0].region_info.bounding_box;

    const ima = document.getElementById("input");
    const w = Number(ima.width);
    const h = Number(ima.height);

    return {
      leftCol: clarfaiim.left_col * w,
      rightCol: w - clarfaiim.right_col * w,
      topRow: clarfaiim.top_row * h,
      bottomRow: h - clarfaiim.bottom_row * h,
    };
  };
  const sub = (e) => {
    setUrl(e);
    fetch("https://mysterious-headland-13441.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: e,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.outputs) {
          display(calculateFl(res));
        } else {
          setUrl("invalid");
        }
      })
      .then((res) => {
        fetch("https://mysterious-headland-13441.herokuapp.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
          }),
        })
          .then((d) => d.json())
          .then((d) => setuser(d));
      });
  };

  return (
    <div>
      {sign === "sign" ? (
        <Signin setSign={setSign} setuser={setuser} />
      ) : sign === "register" ? (
        <Register setSign={setSign} setuser={setuser} />
      ) : (
        <>
          <Navigation setSign={setSign} setUrl={setUrl} />
          <Logo />
          <Rank name={user.name} rank={user.entries} />
          <Image sub={sub} setUrl={setUrl} />
          <Facerecog url={url} box={box} />
        </>
      )}
    </div>
  );
}

export default App;
