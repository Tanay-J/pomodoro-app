import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useTaskManager } from "../../contexts/task-manager-context";
import { addTask, updateTask } from "../../firebase/service-requests";
import { Loader } from "../loaders";
import styles from "./modal.module.css";

const Modal = () => {
  const { taskManagerState, taskManagerDispatch } = useTaskManager();
  const [formData, setFormData] = useState(
    taskManagerState.taskToEdit._id
      ? taskManagerState.taskToEdit
      : {
          _id: uuid(),
          title: "",
          desc: "",
          time: 25,
          breakTime: 5,
        }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const saveTask = (e) => {
    e.preventDefault();
    if (formData.title && formData.time) {
      if (!taskManagerState.taskToEdit._id) {
        addTask(formData, taskManagerDispatch, setIsLoading);
      } else {
        updateTask(formData, taskManagerDispatch, setIsLoading);
      }
    } else {
      setErrorMsg("Task title and duration are required");
    }
  };
  console.log("modal");
  return (
    <div className={`${styles.modal_wrapper}`}>
      <form
        className={`${styles.modal_container} flex flex-col gap-1 p-m br-s my-l`}
      >
        <input
          className={`${styles.input} px-xs br-s`}
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
          required
        />

        <textarea
          className={`${styles.textarea} br-s`}
          typeof="text"
          placeholder="Task Description"
          value={formData.desc}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, desc: e.target.value }))
          }
        ></textarea>
        <input
          className={`${styles.input} px-xs br-s`}
          type="number"
          placeholder="Time (minutes)"
          value={formData.time}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, time: e.target.value }))
          }
        />
        <div>
          <label>
            <input
              type="radio"
              name="time"
              value="25"
              checked={formData.time == 25}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  time: e.target.value,
                }))
              }
            ></input>
            <small>25 min</small>
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value="40"
              checked={formData.time == 40}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  time: e.target.value,
                }))
              }
            ></input>
            <small>40 min</small>
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value="60"
              checked={formData.time == 60}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  time: e.target.value,
                }))
              }
            ></input>
            <small>60 min</small>
          </label>
        </div>
        <div className="text-center">
          <p className="text-primary">Break</p>
          <label>
            <input
              type="radio"
              name="breakTime"
              value="5"
              checked={formData.breakTime == 5}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  breakTime: e.target.value,
                }))
              }
            ></input>
            <small>Short</small>
          </label>
          <label>
            <input
              type="radio"
              name="breakTime"
              value="15"
              checked={formData.breakTime == 15}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  breakTime: e.target.value,
                }))
              }
            ></input>
            <small>Long</small>
          </label>
        </div>
        {errorMsg && <small className="text-danger">{errorMsg}</small>}
        <Loader isLoading={isLoading} />
        <button className="btn btn-primary my-xs" onClick={saveTask}>
          {taskManagerState.taskToEdit._id ? "EDIT TASK" : "ADD TASK"}
        </button>
        <button
          className="btn btn-outline outline-primary"
          onClick={() => taskManagerDispatch({ type: "TOGGLE_MODAL" })}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};
export { Modal };
