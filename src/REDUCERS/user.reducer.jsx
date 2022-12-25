import { actions } from "../UTILS/constant";

const initialUserData = {};

export const user = (state = initialUserData, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};
