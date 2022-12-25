import { actions } from "../UTILS/constant";

const initalBox = [];
export const box = (state = initalBox, action) => {
  switch (action.type) {
    case actions.SET_BOX: {
      return action.payload;
    }

    default:
      return state;
  }
};
