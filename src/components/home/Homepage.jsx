import { TaskList } from "../home/TaskList";
import { BsPlusCircleFill } from "react-icons/bs";
import { Modal } from "../modal/Modal";
import { useTaskManager } from "../../contexts/task-manager-context";
import styles from "./home.module.css";

const HomePage = () => {
  const { taskManagerState, taskManagerDispatch } = useTaskManager();
  return (
    <>
      <div className="m-xl">
        <h3 className="h3 text-dark">Welcome, Tanay</h3>
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
            onClick={() => taskManagerDispatch({ type: "TOGGLE_MODAL" })}
          />
          {taskManagerState.showModal && <Modal />}
        </div>

        <TaskList />
      </div>
    </>
  );
};
export { HomePage };
