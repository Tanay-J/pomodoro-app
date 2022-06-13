import { Link } from "react-router-dom";
import { useState } from "react";
import { BsClock, BsPencil, BsTrash } from "react-icons/bs";
import { useTaskManager } from "../../contexts/task-manager-context";
import styles from "./home.module.css";
import { deleteTask } from "../../firebase/service-requests";
import { Loader } from "../loaders";

const Task = ({ task }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { taskManagerDispatch } = useTaskManager();
  return (
    <div className={`${styles.task}`} key={task._id}>
      <Link
        to="/timer"
        state={{ task: task }}
        className="link text-dark"
        title="Start Timer"
      >
        <p className={`${styles.task_title}`}>
          {!isLoading && task.title}
          <Loader isLoading={isLoading} />
        </p>
      </Link>

      <div className={`${styles.options_container}`}>
        <Link
          to="/timer"
          state={{ task: task }}
          className="link text-dark"
          title="Start Timer"
        >
          <BsClock
            className={`${styles.option_icon} text-dark pointer`}
            title="Start Timer"
          />
        </Link>
        <BsPencil
          className={`${styles.option_icon} text-dark pointer`}
          title="Edit Task"
          onClick={() =>
            taskManagerDispatch({ type: "EDIT_TASK", payload: task })
          }
        />
        <BsTrash
          className={`${styles.option_icon} text-dark pointer`}
          title="Delete Task"
          onClick={() => {
            deleteTask(task._id, taskManagerDispatch, setIsLoading);
          }}
        />
      </div>
    </div>
  );
};

export { Task };
