import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "./config";

const handleLogin = (loginDetails, setAuthState, setErrorMsg, navigate) => {
  setPersistence(auth, browserLocalPersistence);

  signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      setAuthState((state) => ({
        ...state,
        isAuthenticated: true,
        userData: { email: user.email, displayName: user.displayName },
        uid: user.uid,
      }));
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

const handleLogout = (setAuthState) => {
  signOut(auth)
    .then(() => {
      setAuthState({
        isAuthenticated: false,
        userData: { email: "", displayName: "" },
        uid: "",
      });
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

const handleSignup = (userDetails, setAuthState, navigate, setErrorMsg) => {
  setPersistence(auth, browserLocalPersistence);

  createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      setAuthState((state) => ({
        ...state,
        isAuthenticated: true,
        userData: {
          email: userDetails.email,
          displayName: `${userDetails.fName} ${userDetails.lName}`,
        },
        uid: user.uid,
      }));
      updateProfile(auth.currentUser, {
        displayName: `${userDetails.fName} ${userDetails.lName}`,
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
