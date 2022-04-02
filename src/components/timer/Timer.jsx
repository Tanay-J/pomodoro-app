import styles from "./timer.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  MdOutlineReplay,
  MdPauseCircleFilled,
  MdPauseCircleOutline,
  MdPlayCircleFilled,
  MdPlayCircleOutline,
} from "react-icons/md";
import { useState } from "react";

const Timer = ({ time }) => {
  time *= 60; //time in minutes converted to seconds

  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(1);

  const prefixZero = (num) => (num < 10 ? "0" + num : num);

  const renderTime = ({ remainingTime }) => {
    const minutes = prefixZero(Math.floor((remainingTime % 3600) / 60));
    const seconds = prefixZero(remainingTime % 60);
    {
      return remainingTime == 0 ? (
        <p className="text-primary text-s font-bold">Time Up!</p>
      ) : (
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
    }
  };

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        size={300}
        duration={time}
        colors={["#6EBF8B", "#6EBF8B", "#FF0000", "#FF0000"]}
        colorsTime={[time, time / 4, time / 6, 0]}
        key={key}
      >
        {({ remainingTime }) => renderTime({ remainingTime })}
      </CountdownCircleTimer>

      {/* counter controls */}
      <div className="flex justify-con-center my-l">
        {!isPlaying ? (
          <MdPauseCircleFilled
            className="text-primary text-xl mx-s"
            title="Start"
            onClick={() => setIsPlaying(false)}
          />
        ) : (
          <MdPauseCircleOutline
            className="text-primary text-xl mx-s"
            title="Start"
            onClick={() => setIsPlaying(false)}
          />
        )}
        {isPlaying ? (
          <MdPlayCircleFilled
            className="text-primary text-xl mx-s"
            title="Start"
            onClick={() => setIsPlaying(true)}
          />
        ) : (
          <MdPlayCircleOutline
            className="text-primary text-xl mx-s"
            title="Start"
            onClick={() => setIsPlaying(true)}
          />
        )}
        <MdOutlineReplay
          className="text-primary text-xl mx-s"
          title="Start"
          onClick={() => setKey(key + 1)}
        />
      </div>
    </div>
  );
};
export { Timer };
