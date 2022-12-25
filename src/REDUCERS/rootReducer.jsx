import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { url } from "./url.reducer";
import { isProfileOpen } from "./isProfileOpen.reducer";
import { box } from "./box.reducer";

export const rootReducer = combineReducers({
  userData: user,
  url: url,
  isProfileOpen: isProfileOpen,
  box: box,
});
