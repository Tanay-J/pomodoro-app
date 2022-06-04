import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "./config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const handleLogin = async (loginDetails, setErrorMsg, navigate) => {
  try {
    setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(
      auth,
      loginDetails.email,
      loginDetails.password
    );
    navigate("/home");
  } catch (error) {
    switch (error.message) {
      case "Firebase: Error (auth/user-not-found).":
        setErrorMsg("This email is not registered");
        break;
      case "Firebase: Error (auth/wrong-password).":
        setErrorMsg("Incorrect Password");
        break;
      default:
        setErrorMsg(error.message);
    }
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error", error.message);
  }
};

const handleSignup = async (
  userDetails,
  authDispatch,
  navigate,
  setErrorMsg
) => {
  try {
    setPersistence(auth, browserLocalPersistence);
    const res = await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );
    await updateProfile(res.user, {
      displayName: `${userDetails.fName} ${userDetails.lName}`,
    });
    authDispatch({ type: "SIGNUP", payload: [res.user, userDetails] });
    navigate("/home");
  } catch (error) {
    switch (error.message) {
      case "Firebase: Error (auth/invalid-email).":
        setErrorMsg("Invalid Email Address");
        break;
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        setErrorMsg("Password should be at least 6 characters long");
        break;
      default:
        setErrorMsg(error.message);
    }
  }
};
const addTask = async (taskData, taskManagerDispatch) => {
  try {
    const user = auth.currentUser;
    await setDoc(doc(db, "tasks", taskData._id), {
      _id: taskData._id,
      title: taskData.title,
      desc: taskData.desc,
      time: taskData.time,
      breakTime: taskData.breakTime,
      author: user.uid,
    });
    taskManagerDispatch({ type: "ADD_TASK", payload: taskData });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getTasks = async (taskManagerDispatch) => {
  try {
    const user = auth.currentUser;
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("author", "==", user.uid));
    const querySnapshot = await getDocs(q);
    taskManagerDispatch({ type: "GET_TASKS", payload: querySnapshot });
  } catch (error) {
    console.error("Error getting tasks: ", error);
  }
};

const updateTask = async (updatedTask, taskManagerDispatch) => {
  try {
    const taskRef = doc(db, "tasks", updatedTask._id);
    await updateDoc(taskRef, updatedTask);
    taskManagerDispatch({ type: "ADD_TASK", payload: updatedTask });
  } catch (error) {
    console.error("Error updating tasks: ", error);
  }
};

const deleteTask = async (taskId, taskManagerDispatch) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    taskManagerDispatch({ type: "REMOVE_TASK", payload: taskId });
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};

export {
  addTask,
  deleteTask,
  getTasks,
  handleLogin,
  handleLogout,
  handleSignup,
  updateTask,
};
