import { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");
export const Modal = (props) => {
  useEffect(() => {
    modalRoot.appendChild(ele);
    return () => {
      modalRoot.removeChild(ele);
    };
    // eslint-disable-next-line
  }, []);
  const ele = document.createElement("div");
  return ReactDOM.createPortal(props.children, ele);
};
