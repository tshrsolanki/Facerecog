import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setProfileOpen, setuser } from "../../ACTIONS/actions";
import "./profile.css";
export const Profile = (props) => {
  const userData = useSelector((state) => state.userData);
  const [name, setname] = useState(userData.name);
  const dispatch = useDispatch();
  const update = async () => {
    if (name) {
      const res = await toast.promise(
        fetch(`http://localhost:5000/profile/${userData.id}`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }),
        {
          pending: "updating name",
          success: "name updated successfully",
          error: "something went wrong",
        },
        {
          position: "bottom-center",
          theme: "colored",
          hideProgressBar: true,
          autoClose: 1000,
        }
      );

      const data = await res.json();
      setTimeout(() => {
        dispatch(setuser(data));
        dispatch(setProfileOpen(false));
      }, 1000);
    }
  };
  return (
    <div className="profile-modal">
      <article className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center bg-white  ">
        <main className="pa3 black-80 w-100 ">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100px",
            }}
          >
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBNdcMDNS2r9df1IWFVc8AY0QNtfNhEJv7fGS5TdhUWrlBqfGu1PCCn9lKpL-FqF9dWc&usqp=CAU"
              }
              className="br-100  dib"
              height={90}
              width={90}
              alt="avatar"
            />
            <button
              onClick={() => dispatch(setProfileOpen(false))}
              className="closeProfile"
            >
              &times;
            </button>
          </div>

          <h3>{name}</h3>
          <h6>Image submitted :{userData.entries}</h6>
          <p>
            Member since:
            {new Date(userData.joined).toUTCString().slice(4, 16)}
          </p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Change Name to:
          </label>
          <input
            className="pa1 ba w-100"
            type="text"
            name="user-name"
            placeholder={userData.name}
            id=""
            onChange={(e) => setname(e.target.value)}
          />
          {/* <label className="mt2 fw6" htmlFor="user-name">
            Age
          </label> */}
          {/* <input
            className="pa1 ba w-100"
            type="text"
            name="age"
            id=""
            onChange={(e) => {
              setage(e.target.value);
            }}
          /> */}
          <div
            className="mt3"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={update}
              className="b pa1 grow pointer hover-white w-40 bg-light-blue b--black-20"
            >
              Save
            </button>
            <button
              onClick={() => dispatch(setProfileOpen(false))}
              className="b pa1 grow pointer hover-white w-40 bg-light-red b--black-20"
            >
              Cancel
            </button>
          </div>
        </main>
      </article>
    </div>
  );
};
