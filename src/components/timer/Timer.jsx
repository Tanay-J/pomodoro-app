import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  MdOutlineReplay,
  MdPauseCircleFilled,
  MdPauseCircleOutline,
  MdPlayCircleFilled,
  MdPlayCircleOutline,
} from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./timer.module.css";

const Timer = ({ time, breakTime }) => {
  time *= 60; //time in minutes converted to seconds
  breakTime *= 60;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isTaskTime, setIsTaskTime] = useState(true);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [key, setKey] = useState(1);

  const prefixZero = (num) => (num < 10 ? "0" + num : num);

  // Text to render inside Task Timer
  const renderTaskTime = ({ remainingTime }) => {
    const minutes = prefixZero(Math.floor((remainingTime % 3600) / 60));
    const seconds = prefixZero(remainingTime % 60);

    document.title = `${minutes}m: ${seconds}s (Task)`;

    return (
      <div className="text-center">
        <p className={`${styles.timer}`}>
          {minutes}m : {seconds}s
        </p>

        {isPlaying ? (
          <p className="text-gray my-s">out of {time / 60} min</p>
        ) : (
          <p className="text-primary font-bold my-s">PAUSED</p>
        )}
      </div>
    );
  };

  // Text to render inside Break Timer
  const renderBreakTime = ({ remainingTime }) => {
    const minutes = prefixZero(Math.floor((remainingTime % 3600) / 60));
    const seconds = prefixZero(remainingTime % 60);

    document.title = `${minutes}m: ${seconds}s (Break)`;

    return (
      <div className="text-center">
        <h3 className="text-dark">BREAK</h3>
        <p className={`${styles.timer}`}>
          {minutes}m : {seconds}s
        </p>
      </div>
    );
  };

  const taskCompletionHandler = () => {
    toast("Time Up, Good Job!", {
      icon: "👏",
    });
    setIsBreakTime(true);
    setIsTaskTime(false);
  };
  const breakCompletionHandler = () => {
    toast("Break Over!", {
      icon: "⏰",
    });
    setIsBreakTime(false);
  };
  const taskRestartHandler = () => setIsTaskTime(true);

  return (
    <div>
      {/* Timer for task */}
      {isTaskTime && (
        <CountdownCircleTimer
          isPlaying={isPlaying}
          size={300}
          duration={time}
          colors={["#6EBF8B", "#6EBF8B", "#FF0000", "#FF0000"]}
          colorsTime={[time, time / 4, time / 6, 0]}
          key={key}
          onComplete={taskCompletionHandler}
        >
          {({ remainingTime }) => renderTaskTime({ remainingTime })}
        </CountdownCircleTimer>
      )}

      {/* Timer for break */}
      {isBreakTime && (
        <CountdownCircleTimer
          isPlaying={isPlaying}
          size={300}
          duration={breakTime}
          colors={["#6EBF8B", "#6EBF8B", "#FF0000", "#FF0000"]}
          colorsTime={[breakTime, breakTime / 4, breakTime / 6, 0]}
          key={key + 1}
          onComplete={breakCompletionHandler}
        >
          {({ remainingTime }) => renderBreakTime({ remainingTime })}
        </CountdownCircleTimer>
      )}

      {/* Buttons to show on completion of both task timer and break timer*/}
      {!isBreakTime && !isTaskTime && (
        <div className="text-center">
          <h3
            className="text-primary pointer my-s"
            onClick={taskRestartHandler}
          >
            Restart Timer
          </h3>

          <Link to="/home" className={`${styles.link}`}>
            <h3 className="text-gray pointer">Go to Tasks</h3>
          </Link>
        </div>
      )}

      {/* timer controls */}
      {isTaskTime && (
        <div className="flex justify-con-center my-l">
          {!isPlaying ? (
            <MdPauseCircleFilled
              className="text-primary text-xl mx-s"
              title="Paused"
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <MdPauseCircleOutline
              className={`${styles.timer_btn} text-primary text-xl mx-s`}
              title="Pause"
              onClick={() => setIsPlaying(false)}
            />
          )}
          {isPlaying ? (
            <MdPlayCircleFilled
              className="text-primary text-xl mx-s"
              title="Timer Started"
              onClick={() => setIsPlaying(true)}
            />
          ) : (
            <MdPlayCircleOutline
              className={`${styles.timer_btn} text-primary text-xl mx-s`}
              title="Start"
              onClick={() => setIsPlaying(true)}
            />
          )}
          <MdOutlineReplay
            className={`${styles.timer_btn} text-primary text-xl mx-s`}
            title="Restart"
            onClick={() => setKey(key + 5)}
          />
        </div>
      )}
    </div>
  );
};
export { Timer };
