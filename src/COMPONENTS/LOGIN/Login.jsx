import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setuser } from "../../ACTIONS/actions";

export const Login = () => {
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saveAuthTokenInSession = (token) => {
    window.localStorage.setItem("token", token);
  };

  const login = async (e) => {
    e.preventDefault();
    if (!mail || !pass) {
      toast("please fill up all the fields", {
        position: "bottom-center",
        hideProgressBar: true,
        type: "warning",
        theme: "colored",
        toastId: 1,
      });
    } else {
      try {
        toast.dismiss();
        const res = await toast.promise(
          fetch("http://localhost:5000/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: mail,
              password: pass,
            }),
          }),
          {
            pending: "logging in",
            success: "logged in",
            error: "something went wrong",
          },
          {
            position: "bottom-center",
            theme: "colored",
            autoClose: 1000,
            hideProgressBar: true,
          }
        );

        const user = await res.json();
        if (user.id) {
          saveAuthTokenInSession(user.token);
          navigate("/");
          dispatch(setuser(user));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <article className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Log In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="off"
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
                  autoComplete="off"
                  onChange={(e) => setpass(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="tc">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={(e) => login(e)}
              />
            </div>
            <div className="lh-copy mt3 center">
              <p
                onClick={() => navigate("/signup")}
                className="f6 link dim black db pointer"
              >
                Sign up
              </p>
            </div>
          </form>
        </main>
      </article>
    </>
  );
};
