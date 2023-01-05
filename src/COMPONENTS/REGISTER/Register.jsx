import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setuser } from "../../ACTIONS/actions";

export const Register = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !pass) {
      toast("please fill up all the fields", {
        position: "bottom-center",
        hideProgressBar: true,
        type: "warning",
        theme: "colored",
        toastId: 2,
      });
    } else {
      try {
        toast.dismiss();
        const registeringToast = toast.loading("Registering", {
          position: "bottom-center",
          theme: "colored",
        });
        const res = await fetch("http://localhost:5000/register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: pass,
            name: name,
          }),
        });

        const user = await res.json();

        if (user.id) {
          toast.update(registeringToast, {
            render: "Registered succesfully",
            type: "success",
            isLoading: false,
            autoClose: 1500,
            hideProgressBar: true,
          });
          window.localStorage.setItem("token", user.token);
          dispatch(setuser(user));
          navigate("/");
          return;
        }
        toast.update(registeringToast, {
          render: user.message,
          type: "warning",
          isLoading: false,
          autoClose: 1500,
          hideProgressBar: true,
        });
      } catch (error) {
        toast.dismiss();
        toast.error("Something went wrong", {
          hideProgressBar: true,
          autoClose: 2000,
          position: "bottom-center",
          theme: "colored",
        });
        console.log(error);
      }
    }
  };
  return (
    <article className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="name"
                name="name"
                id="name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={(e) => setemail(e.target.value)}
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
          </fieldset>

          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={submit}
            />
          </div>
        </form>
      </main>
    </article>
  );
};
