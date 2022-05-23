import React, { useState } from "react";

export const Signin = (props) => {
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const [mess, setmess] = useState("");

  const sin = (e) => {
    e.preventDefault();
    if (!mail || !pass) {
      setmess("please fill up all fields");
    } else {
      fetch("http://localhost:5000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
          password: pass,
        }),
      })
        .then((res) => res.json())
        .then((d) => {
          if (d !== "wrong credentials") {
            if (d.id) {
              props.setuser(d);
              setmess("");
              props.setSign("home");
            } else {
              setmess("incorrect username or password");
            }
          } else {
            setmess("incorrect username or password");
          }
        });
    }
  };

  return (
    <article className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={(e) => setmail(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setpass(e.target.value)}
              />
            </div>
            <div className="tc">
              <h6>{mess}</h6>
            </div>
          </fieldset>
          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={(e) => sin(e)}
            />
          </div>
          <div className="lh-copy mt3 center">
            <p
              onClick={() => props.setSign("register")}
              className="f6 link dim black db pointer"
            >
              Sign up
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};
