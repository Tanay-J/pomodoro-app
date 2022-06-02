import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "./config";

const handleLogin = (loginDetails, authDispatch, setErrorMsg, navigate) => {
  setPersistence(auth, browserLocalPersistence);
  signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
    .then((userCredentials) => {
      authDispatch({ type: "LOGIN", payload: userCredentials.user });
      navigate("/home");
    })
    .catch((error) => {
      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          setErrorMsg("This email is not registered");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setErrorMsg("Incorrect Password");
          break;
        default:
          setErrorMsg(error.message);
      }
    });
};

const handleLogout = (authDispatch) => {
  signOut(auth)
    .then(() => {
      authDispatch({ type: "LOGOUT" });
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

const handleSignup = (userDetails, authDispatch, navigate, setErrorMsg) => {
  setPersistence(auth, browserLocalPersistence);
  createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: `${userDetails.fName} ${userDetails.lName}`,
      });
      authDispatch({
        type: "SIGNUP",
        payload: [auth.currentUser, userDetails],
      });
      navigate("/home");
    })
    .catch((error) => {
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          setErrorMsg("Invalid Email Address");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setErrorMsg("Password should be at least 6 characters long");
          break;
        default:
          setErrorMsg(error.message);
      }
    });
};

export { handleLogin, handleLogout, handleSignup };
