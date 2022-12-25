import { actions } from "../UTILS/constant";

const initialValue = false;

export const isProfileOpen = (state = initialValue, action) => {
  switch (action.type) {
    case actions.SET_IS_PROFILE_OPEN:
      return action.payload;

    default:
      return state;
  }
};
