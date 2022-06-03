import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";
import { authReducer } from "../utils/reducers/authReducer";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  let initialState = {
    isAuthenticated: false,
    userData: { email: "", displayName: "" },
    uid: "",
  };

  const [authState, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authDispatch({ type: "LOGIN", payload: user });
      } else {
        authDispatch({ type: "LOGOUT" });
      }
    });
  }, [authState.isAuthenticated]);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
