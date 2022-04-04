import styles from "./timer.module.css";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../navigation";
import { Timer } from "./Timer";
import { BsArrowLeftRight } from "react-icons/bs";

const TimerPage = () => {
  const location = useLocation();
  const { title, time, desc } = location.state?.task;

  return (
    <div>
      <Navbar />
      <main className="grid col-2 my-l">
        <section className={`${styles.timer_container} mx-auto my-m`}>
          <Timer time={time} />
        </section>
        <section className={`${styles.text_container}`}>
          <h4 className="h4 text-dark">{title} </h4>
          <p className="text-gray my-s">{desc}</p>
          <Link to="/home" className={`${styles.link} text-xs text-primary`}>
            Done? Go Back to the Task List
          </Link>
        </section>
      </main>
    </div>
  );
};
export { TimerPage };
