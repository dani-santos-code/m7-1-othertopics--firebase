import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyDIBwW8NnXmmgfsT0eO1gSenZ1aafH_7DI",
  authDomain: "user-app-85517.firebaseapp.com",
  databaseURL: "https://user-app-85517.firebaseio.com",
  projectId: "user-app-85517",
  storageBucket: "user-app-85517.appspot.com",
  messagingSenderId: "246946697822",
  appId: "1:246946697822:web:a38fe8efe6409bb37f1acf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, user, signOut }) => {
  const [appUser, setAppUser] = useState({});
  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };
  useEffect(() => {
    if (user) {
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);
  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
