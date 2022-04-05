import styles from "./landing.module.css";
import landing from "../../assets/landing.svg";
import { Link } from "react-router-dom";
import { funFacts } from "../../utils/funFacts";

const LandingPage = () => {
  return (
    <>
      <div className={`grid col-2 justify-items-center my-xl py-xl`}>
        <div>
          <div className="my-s">
            <h3 className="h3 text-dark my-s">
              Welcome to <span className="text-primary">Streak</span>
            </h3>
            <p className="text-gray">
              A simple app designed to beat procrastination
            </p>
            <p className="text-gray">and help you accomplish more</p>
          </div>

          <Link to="/home">
            <button className={`${styles.btn} btn btn-primary text-xs my-s`}>
              Start
            </button>
          </Link>
        </div>
        <div>
          <img src={landing} className={`${styles.banner_img}`}></img>
        </div>
      </div>
      <div className="text-center">
        <small className="text-primary">Do you know? </small>
        <small className={`${styles.info_text} text-gray`}>
          {funFacts[Math.floor(Math.random() * 3)]}
        </small>
      </div>
    </>
  );
};
export { LandingPage };
