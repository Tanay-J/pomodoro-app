import { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { handleLogout } from "../../firebase/service-requests";
import styles from "./navigation.module.css";

const Navbar = () => {
  const themeFromLocal = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(themeFromLocal || false);

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    darkMode
      ? document.body.classList.add("dark-mode")
      : document.body.classList.remove("dark-mode");
  }, [darkMode]);

  return (
    <header
      className={`${
        darkMode && styles.nav_header_dark
      } nav-header nav-bg-transparent px-xl py-xs`}
    >
      <Link to="/home" className="link">
        <h2 className="h2 text-primary">Streak.</h2>
      </Link>
      <nav>
        <ul className="nav-links flex align-items-center gap-1">
          <li>
            {!isAuthenticated ? (
              <Link to="/login">
                <button className="btn btn-outline outline-primary mx-xs">
                  Login
                </button>
              </Link>
            ) : (
              <button
                className="btn btn-outline outline-primary"
                onClick={() => handleLogout(authDispatch)}
              >
                Logout
              </button>
            )}
          </li>
          <li>
            {!isAuthenticated && (
              <Link to="/signup">
                <button className="btn btn-primary mx-xs">Sign Up</button>
              </Link>
            )}
          </li>
          <li>
            {darkMode ? (
              <BsSunFill
                size={25}
                className="text-white pointer"
                onClick={() => setDarkMode(false)}
              />
            ) : (
              <BsMoonFill
                size={25}
                className="pointer"
                onClick={() => setDarkMode(true)}
              />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
export { Navbar };
