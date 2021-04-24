import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

/**
 * Initiates firebase application
 * @return { void }
 */
export function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
  }
}

/**
 *
 * @param {*} handler
 * @return { void }
 */
export function attachAuthListener(handler) {
  return firebase.auth().onAuthStateChange((user) => {
    handler(user);
  });
}

/**
 * Param MUST be validated beforehand.
 * @param { string } email
 * @param { string } password
 * @param { function } callback
 */
export async function createNewUser(email, password, callback) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(callback);
}

/**
 * Param MUST be validated beforehand.
 * @param { string } email
 * @param { string } password
 */
export async function authenticate(email, password, callback, errhandler) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(callback)
    .catch(errhandler);
}

/**
 * Deauthenicates (logout)
 */
export async function deauthorize() {
  await firebase.auth().signOut();
}

/**
 * UserContext
 */
export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

  const contextValue = {
    currentUser,
    isLoggedIn,
    userToken,
  };
  
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        console.log("logged")
        setUserToken(user.getIdToken());
      }
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
