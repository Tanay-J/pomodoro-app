import { useEffect, useState } from "react";
import styles from "./navigation.module.css";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

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
        <h2 class="h2 text-primary">Streak.</h2>
      </Link>
      <nav>
        <ul className="nav-links">
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
