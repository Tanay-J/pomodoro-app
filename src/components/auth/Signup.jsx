import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { handleSignup } from "../../firebase/service-requests";
import { Loader } from "../loaders";
import styles from "./auth.module.css";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useAuth();

  const inputHandler = (event) => {
    setErrorMsg("");
    const {
      target: { id, value },
    } = event;
    setUserDetails({ ...userDetails, [id]: value });
  };

  const dataValidation = (event) => {
    event.preventDefault();
    const { fName, lName, email, password, cnfPassword } = userDetails;

    if (fName && lName && email && password) {
      if (password !== cnfPassword) {
        setErrorMsg("Password does not match");
      } else {
        setErrorMsg("");
        handleSignup(
          userDetails,
          authDispatch,
          navigate,
          setErrorMsg,
          setIsLoading
        );
      }
    } else setErrorMsg("All fields are mandatory");
  };

  useEffect(() => {
    document.title = "Signup";
  });

  return (
    <main>
      {!isAuthenticated ? (
        <>
          <h5 className="h5 text-center text-dark">Sign Up</h5>
          <form
            className={`${styles.form_container} card-shadow p-m mx-auto my-m`}
          >
            <div className="flex justify-con-space-bet my-xs">
              <div>
                <label
                  htmlFor="fName"
                  className={`${styles.form_label} text-dark`}
                >
                  <small>First Name</small>
                </label>
                <input
                  type="text"
                  id="fName"
                  placeholder="First Name"
                  className="p-xs"
                  onChange={inputHandler}
                />
              </div>
              <div>
                <label
                  htmlFor="lName"
                  className={`${styles.form_label} text-dark`}
                >
                  <small>Last Name</small>
                </label>
                <input
                  type="text"
                  id="lName"
                  placeholder="Last Name"
                  className="p-xs"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <label htmlFor="email" className="text-dark my-xs">
              <small>Email Address</small>
            </label>
            <input
              type="text"
              className="p-xs"
              placeholder="Email"
              id="email"
              value={userDetails.email}
              onChange={inputHandler}
            />
            <label
              className={`${styles.form_label} text-dark`}
              htmlFor="password"
            >
              <small>Password</small>
            </label>
            <input
              type="password"
              className="p-xs my-xs"
              placeholder="Password"
              id="password"
              value={userDetails.password}
              onChange={inputHandler}
            />
            <label
              className={`${styles.form_label} text-dark`}
              htmlFor="cnfPassword"
            >
              <small>Confirm Password</small>
            </label>
            <input
              type="password"
              className="p-xs my-xs"
              placeholder="Confirm Password"
              id="cnfPassword"
              onChange={inputHandler}
            />

            {errorMsg && <p className="text-center text-danger">{errorMsg}</p>}
            <Loader isLoading={isLoading} />

            <button className="btn btn-primary my-s" onClick={dataValidation}>
              Signup
            </button>
            <Link to="/login">
              <button className="btn btn-outline outline-primary width-100">
                Login
              </button>
            </Link>
          </form>
        </>
      ) : (
        <h5 className="h5 text-center text-dark">You are already logged in</h5>
      )}
    </main>
  );
};
export { Signup };
