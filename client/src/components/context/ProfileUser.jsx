import React, { createContext, useContext, useReducer, useState } from "react";
import { LogUserContext } from "./LoggedUser";
export const ProfileUserDispatchContext = createContext();
export const ProfileUserStateContext = createContext();

export const ProfileUser = (props) => {
  const logUser = useContext(LogUserContext);
  const [profileUser, setProfileUser] = useState(logUser);
  console.log("logUser in profileUser", logUser);
  console.log("profileUser in profileUser", profileUser);

  const reducer = (state, action) => {
    console.log("aaaaaaaaaaaaaaaction", action);
    switch (action.type) {
      case "getProfileUser":
        return setProfileUser(action.payload);
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, profileUser);
  return (
    <ProfileUserDispatchContext.Provider value={dispatch}>
      <ProfileUserStateContext.Provider value={state}>
        {props.Children}
      </ProfileUserStateContext.Provider>
    </ProfileUserDispatchContext.Provider>
  );
};
