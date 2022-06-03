import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useTaskManager } from "../../contexts/task-manager-context";
import styles from "./home.module.css";
import { deleteTask } from "../../firebase/service-requests";

const Task = ({ task }) => {
  const { taskManagerDispatch } = useTaskManager();
  return (
    <div className={`${styles.task}`} key={task._id}>
      <Link to="/timer" state={{ task: task }} className="link text-dark ">
        <p onClick={() => taskManagerDispatch({ type: "SHOW_TIMER" })}>
          {task.title}
        </p>
      </Link>

      <div className={`${styles.options_container}`}>
        <BsPencil
          className={`${styles.option_icon} text-dark pointer`}
          onClick={() =>
            taskManagerDispatch({ type: "EDIT_TASK", payload: task })
          }
        />
        <BsTrash
          className={`${styles.option_icon} text-dark pointer`}
          onClick={() => {
            deleteTask(task._id, taskManagerDispatch);
          }}
        />
      </div>
    </div>
  );
};

export { Task };
