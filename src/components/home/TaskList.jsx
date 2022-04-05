import { Task } from "./Task";
import { useTaskManager } from "../../contexts/task-manager-context";

const TaskList = () => {
  const { taskManagerState } = useTaskManager();
  return (
    <ul className="flex flex-col px-m my-m">
      {taskManagerState.taskList.length !== 0 &&
        taskManagerState.taskList.map((task) => (
          <li className="text-dark" key={task._id}>
            <Task task={task} />
          </li>
        ))}
    </ul>
  );
};

export { TaskList };
