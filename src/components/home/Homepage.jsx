import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { TaskList } from "../home/TaskList";
import { Modal } from "../modal/Modal";
import { useTaskManager } from "../../contexts/task-manager-context";
import { useAuth } from "../../contexts/auth-context";
import { getTasks } from "../../firebase/service-requests";
import styles from "./home.module.css";

const HomePage = () => {
  const { taskManagerState, taskManagerDispatch } = useTaskManager();
  const {
    authState: { isAuthenticated, userData },
  } = useAuth();
  const navigate = useNavigate();
  document.title = "Home | Streak";

  const addTaskBtnHandler = () => {
    isAuthenticated
      ? taskManagerDispatch({ type: "TOGGLE_MODAL" })
      : navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated) {
      getTasks(taskManagerDispatch);
    } else {
      taskManagerDispatch({ type: "CLEAR_LIST" });
    }
  }, [isAuthenticated, taskManagerState.taskToEdit]);
  return (
    <>
      <div className="m-xl">
        <h3 className="h3 text-dark">
          Welcome, {userData.displayName?.split(" ")[0] || "User"}
        </h3>
        {taskManagerState.taskList.length == 0 && (
          <p className="text-s text-gray">Let's start!</p>
        )}
        {taskManagerState.taskList.length == 1 && (
          <p className="text-s text-gray">
            You have {taskManagerState.taskList.length} task pending. Let's go!
          </p>
        )}
        {taskManagerState.taskList.length > 1 && (
          <p className="text-s text-gray">
            You have {taskManagerState.taskList.length} tasks pending. Let's go!
          </p>
        )}
      </div>

      <div className={`${styles.tasks_container} mx-xl p-m br-m`}>
        <div className="flex justify-con-space-bet">
          <h5 className="h5 text-primary">Tasks</h5>
          <BsPlusCircleFill
            size={40}
            className="pointer text-primary"
            onClick={() => addTaskBtnHandler()}
          />
          {taskManagerState.showModal && <Modal />}
        </div>

        <TaskList />
      </div>
    </>
  );
};
export { HomePage };
