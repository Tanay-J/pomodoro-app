import { createContext, useContext, useReducer } from "react";
import { taskManagerReducer } from "../utils/reducers/taskManagerReducer";

const TaskManagerContext = createContext();
const useTaskManager = () => useContext(TaskManagerContext);

const TaskManagerProvider = ({ children }) => {
  const initialState = {
    taskList: [],
    showModal: false,
    taskToEdit: {},
  };

  const [taskManagerState, taskManagerDispatch] = useReducer(
    taskManagerReducer,
    initialState
  );

  return (
    <TaskManagerContext.Provider
      value={{ taskManagerState, taskManagerDispatch }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export { TaskManagerProvider, useTaskManager };
