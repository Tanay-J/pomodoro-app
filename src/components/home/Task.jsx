import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useTaskManager } from "../../contexts/task-manager-context";

const Task = ({ task }) => {
  const { taskManagerDispatch } = useTaskManager();
  return (
    <div className="flex justify-con-space-bet" key={task._id}>
      <Link
        to="/timer"
        state={{ time: task.time }}
        className="link text-dark text-s"
      >
        <p onClick={() => taskManagerDispatch({ type: "SHOW_TIMER" })}>
          {task.title}
        </p>
      </Link>

      <div>
        <BsPencil
          size={20}
          className="text-dark mx-s pointer"
          onClick={() =>
            taskManagerDispatch({ type: "EDIT_TASK", payload: task })
          }
        />
        <BsTrash
          size={20}
          className="text-dark mx-s pointer"
          onClick={() =>
            taskManagerDispatch({ type: "REMOVE_TASK", payload: task._id })
          }
        />
      </div>
    </div>
  );
};

export { Task };
