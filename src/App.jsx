import React, { useEffect } from "react";
import { Navigation } from "./COMPONENTS/NAVIGATION/Navigation";
import { Image } from "./COMPONENTS/IMAGE/Image";
import { Rank } from "./COMPONENTS/RANK/Rank";
import { Facerecog } from "./COMPONENTS/FACERECOG/Facerecog";
import "./App.css";
import { Modal } from "./COMPONENTS/MODAL/Modal";
import { Profile } from "./COMPONENTS/PROFILE/Profile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "./ACTIONS/actions";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.isProfileOpen);
  const user = useSelector((state) => state.userData);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          });
          const data = await res.json();
          if (data.id) {
            dispatch(setuser(data));
          } else {
            window.localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (error) {
          console.log("server offline");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    if (!user.id) fetchUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navigation />
      {isProfileOpen && (
        <Modal>
          <Profile />
        </Modal>
      )}
      <Rank />
      <Image />
      <Facerecog />
    </div>
  );
}

export default App;
