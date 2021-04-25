import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
 *
 */
export async function spawnUser(firstName, lastName, uid, socialMedia) {
  await firebase
    .database()
    .ref("users/" + uid)
    .set({
      firstName: firstName,
      lastName: lastName,
      socialMedia: socialMedia
    });
}

/**
 * triggers a callback when a notification is triggered
 * @param { string } uid 
 * @param { function} callback 
 */
export async function watchNotifications(uid, callback){ 
  await firebase
  .database()
  .ref(`datematch/${uid}`)
  .on("child_added", (snapshot) => callback(snapshot));
}

/**
 * Deauthenicates (logout)
 */
export async function deauthorize() {
  await firebase.auth().signOut();
}

/**
 * Handles Authentication for User
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
    firebase.auth().onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const _token = await user.getIdToken()

        setUserToken(_token);
      }
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
