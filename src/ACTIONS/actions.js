import { toast } from "react-toastify";
import { actions } from "../UTILS/constant";
export const setuser = (user) => {
  return {
    type: actions.SET_USER,
    payload: user,
  };
};
export const setEmptyBox = () => {
  return {
    type: actions.SET_BOX,
    payload: [],
  };
};
export const setUrl = (url) => {
  toast.dismiss();
  return {
    type: actions.SET_URL,
    payload: url,
  };
};
export const setProfileOpen = (boolData) => {
  return {
    type: actions.SET_IS_PROFILE_OPEN,
    payload: boolData,
  };
};
export const setMessage = (message) => {
  return {
    type: actions.SET_MESSAGE,
    payload: message,
  };
};

export const fetchImageRecogData = (link, id) => {
  return async (dispatch) => {
    dispatch(setMessage(""));
    dispatch(setEmptyBox());
    toast.dismiss();
    const loadingToast = toast.loading("fetching data", {
      position: "top-center",
      theme: "colored",
    });
    const resp = await fetch("http://localhost:5000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: link,
        id,
      }),
    });

    const { data, user, message } = await resp.json();

    dispatch(setMessage(""));

    if (message) {
      if (message === "Invaild url") {
        toast.update(loadingToast, {
          render: message,
          type: "error",
          isLoading: false,
        });
        return;
      }
      toast.update(loadingToast, {
        render: message,
        type: "warning",
        isLoading: false,
      });
    } else {
      const boxData = data.outputs[0].data.regions.map((i) => {
        const clarfaiim = i.region_info.bounding_box;
        const ima = document.getElementById("input");
        const w = Number(ima.width);
        const h = Number(ima.height);

        return {
          leftCol: clarfaiim.left_col * w,
          rightCol: w - clarfaiim.right_col * w,
          topRow: clarfaiim.top_row * h,
          bottomRow: h - clarfaiim.bottom_row * h,
        };
      });
      dispatch({ type: actions.SET_BOX, payload: boxData });
      dispatch(setuser(user));
      toast.update(loadingToast, {
        render: "data fetched successfully",
        type: "success",
        isLoading: false,
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };
};
