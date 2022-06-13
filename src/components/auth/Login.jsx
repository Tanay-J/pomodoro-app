import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { handleLogin } from "../../firebase/service-requests";
import { Loader } from "../loaders";
import styles from "./auth.module.css";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    authState: { isAuthenticated },
  } = useAuth();

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setErrorMsg("");
    const {
      target: { id, value },
    } = event;
    setLoginDetails({ ...loginDetails, [id]: value });
  };

  const setTestCredentials = (event) => {
    event.preventDefault();
    const testCredentials = { email: "tanay@test.com", password: "tana@y" };
    setLoginDetails(testCredentials);
  };

  const dataValidation = (event) => {
    event.preventDefault();
    if (loginDetails.email && loginDetails.password) {
      handleLogin(loginDetails, setErrorMsg, setIsLoading, navigate);
      setLoginDetails({ email: "", password: "" });
    } else setErrorMsg("Both fields are required");
  };

  useEffect(() => {
    document.title = "Login";
  });
  return (
    <main>
      {!isAuthenticated ? (
        <>
          <h5 className="h5 text-center text-dark">Login</h5>
          <form
            className={`${styles.form_container} card-shadow p-m mx-auto my-m`}
          >
            <label htmlFor="email" className="text-dark my-xs">
              <small>Email Address</small>
            </label>
            <input
              type="text"
              className="p-xs"
              placeholder="Email"
              id="email"
              value={loginDetails.email}
              required
              onChange={inputHandler}
            />
            <label
              htmlFor="password"
              className={`${styles.form_label} text-dark my-xs`}
            >
              <small>Password</small>
            </label>
            <input
              type="password"
              className="p-xs"
              placeholder="Password"
              id="password"
              value={loginDetails.password}
              required
              onChange={inputHandler}
            />
            {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
            <Loader isLoading={isLoading} />
            <button className="btn btn-primary my-s" onClick={dataValidation}>
              Login
            </button>
            <Link to="/signup">
              <button className="btn btn-outline outline-primary width-100">
                Signup
              </button>
            </Link>
            <button
              className="btn btn-outline outline-primary my-s"
              onClick={setTestCredentials}
            >
              Fill Test Credentials
            </button>
          </form>
        </>
      ) : (
        <h5 className="h5 text-center text-dark">You are already logged in</h5>
      )}
    </main>
  );
};
export { Login };
