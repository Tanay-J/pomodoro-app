import styles from "./timer.module.css";
import { Link, useLocation } from "react-router-dom";
import { Timer } from "./Timer";

const TimerPage = () => {
  const location = useLocation();
  const { title, time, breakTime, desc } = location.state?.task;

  return (
    <>
      <main className={`${styles.timer_wrapper} my-l`}>
        <section className={`${styles.timer_container} mx-auto my-m`}>
          <Timer breakTime={breakTime} time={time} />
        </section>
        <section className={`${styles.text_container}`}>
          <h4 className="h4 text-dark">{title} </h4>
          <p className="text-gray my-s">{desc}</p>
          <Link to="/home" className={`${styles.link} text-xs text-primary`}>
            Done? Go Back to the Task List
          </Link>
        </section>
      </main>
    </>
  );
};
export { TimerPage };
