import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { handleLogout } from "../firebase/service-requests";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  let initialState = {
    isAuthenticated: false,
    userData: { email: "", displayName: "" },
    uid: "",
  };

  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          isAuthenticated: true,
          userData: { email: user.email, displayName: user.displayName },
        });
      } else {
        handleLogout(setAuthState);
      }
    });
  }, [authState.isAuthenticated]);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
