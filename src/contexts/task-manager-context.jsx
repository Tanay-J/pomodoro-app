import { createContext, useContext, useEffect, useReducer } from "react";
import { taskManagerReducer } from "../utils/reducers/taskManagerReducer";

const TaskManagerContext = createContext();
const useTaskManager = () => useContext(TaskManagerContext);

const TaskManagerProvider = ({ children }) => {
  const taskListFromLocal = JSON.parse(localStorage.getItem("taskList"));
  const initialState = {
    taskList: taskListFromLocal || [],
    showModal: false,
    showTimer: false,
    taskToEdit: {},
  };

  const [taskManagerState, taskManagerDispatch] = useReducer(
    taskManagerReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskManagerState.taskList));
  }, [taskManagerState.taskList]);
  return (
    <TaskManagerContext.Provider
      value={{ taskManagerState, taskManagerDispatch }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export { TaskManagerProvider, useTaskManager };
