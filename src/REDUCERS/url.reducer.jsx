import { actions } from "../UTILS/constant";
const initialUrl = "";

export const url = (state = initialUrl, action) => {
  switch (action.type) {
    case actions.SET_URL: {
      return action.payload;
    }

    default:
      return state;
  }
};
