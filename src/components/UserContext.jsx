import React, { useState } from "react";

import fire from "../fire.js";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contextValue = {
    currentUser,
    isLoggedIn,
  };
  fire.auth().onAuthStateChanged((user) => {
    setCurrentUser(user);
    if (user) {
      console.log(user.getIdToken());
    }
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
