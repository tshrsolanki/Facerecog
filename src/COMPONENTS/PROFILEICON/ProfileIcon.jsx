import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch } from "react-redux";
import {
  setEmptyBox,
  setProfileOpen,
  setUrl,
  setuser,
} from "../../ACTIONS/actions";

export const ProfileIcon = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const signout = () => {
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:5000/signout", {
      method: "post",
      headers: { "Content-Type": "application/json", authorization: token },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          dispatch(setUrl(""));
          dispatch(setuser(""));
          dispatch(setEmptyBox());

          navigate("/login");
          window.localStorage.removeItem("token");
        }
      });
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag={"span"}
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
        <div className="pa1 tc">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBNdcMDNS2r9df1IWFVc8AY0QNtfNhEJv7fGS5TdhUWrlBqfGu1PCCn9lKpL-FqF9dWc&usqp=CAU"
            }
            className="br-100  dib"
            height={90}
            width={90}
            alt="avatar"
          />
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => dispatch(setProfileOpen(true))}>
          View Profile
        </DropdownItem>
        <DropdownItem onClick={signout}>Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
