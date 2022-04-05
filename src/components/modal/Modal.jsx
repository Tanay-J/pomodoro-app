import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useTaskManager } from "../../contexts/task-manager-context";
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

  const [errorMsg, setErrorMsg] = useState("");

  const saveTask = (e) => {
    e.preventDefault();
    formData.title && formData.time
      ? taskManagerDispatch({ type: "ADD_TASK", payload: formData })
      : setErrorMsg("Task title and duration are required");
  };
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
          <label
            onClick={(e) =>
              setFormData((prevData) => ({ ...prevData, time: e.target.value }))
            }
          >
            <input
              type="radio"
              name="time"
              value="25"
              checked={formData.time == 25}
            ></input>
            <small>25 min</small>
          </label>
          <label
            onClick={(e) =>
              setFormData((prevData) => ({ ...prevData, time: e.target.value }))
            }
          >
            <input
              type="radio"
              name="time"
              value="40"
              checked={formData.time == 40}
            ></input>
            <small>40 min</small>
          </label>
          <label
            onClick={(e) =>
              setFormData((prevData) => ({ ...prevData, time: e.target.value }))
            }
          >
            <input
              type="radio"
              name="time"
              value="60"
              checked={formData.time == 60}
            ></input>
            <small>60 min</small>
          </label>
        </div>
        <div className="text-center">
          <p className="text-primary">Break</p>
          <label
            onClick={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                breakTime: e.target.value,
              }))
            }
          >
            <input
              type="radio"
              name="breakTime"
              value="5"
              checked={formData.breakTime == 5}
            ></input>
            <small>Short</small>
          </label>
          <label
            onClick={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                breakTime: e.target.value,
              }))
            }
          >
            <input
              type="radio"
              name="breakTime"
              value="15"
              checked={formData.breakTime == 15}
            ></input>
            <small>Long</small>
          </label>
        </div>
        {errorMsg && <small className="text-danger">{errorMsg}</small>}
        <button className="btn btn-primary my-xs" onClick={saveTask}>
          ADD TASK
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
