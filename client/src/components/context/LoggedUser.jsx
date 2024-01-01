import React, { createContext, useEffect, useState } from "react";

const LogUserContext = createContext();
function LoggedUser(props) {
  const [logUser, setLogUser] = useState(
    JSON.parse(localStorage.getItem("userinfo"))
  );

  // useEffect(() => {
  //   setLogUser(JSON.parse(localStorage.getItem("userinfo")));
  // }, []);

  // console.log("logUser", logUser);

  return (
    <LogUserContext.Provider value={logUser}>
      {props.children}
    </LogUserContext.Provider>
  );
}

export { LoggedUser, LogUserContext };
