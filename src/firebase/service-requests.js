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
import toast from "react-hot-toast";

const handleLogin = async (
  loginDetails,
  setErrorMsg,
  setIsLoading,
  navigate
) => {
  try {
    setIsLoading(true);
    setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(
      auth,
      loginDetails.email,
      loginDetails.password
    );
    toast.success("Login Succesful");
    navigate("/home");
  } catch (error) {
    toast.error("Login Unsuccessful");
    switch (error.message) {
      case "Firebase: Error (auth/user-not-found).":
        setErrorMsg("This email is not registered");
        break;
      case "Firebase: Error (auth/wrong-password).":
        setErrorMsg("Incorrect Password");
        break;
      default:
        throw new error(error);
    }
  } finally {
    setIsLoading(false);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged Out");
  } catch (error) {
    toast.error("Try Again!");
    throw new error(error);
  }
};

const handleSignup = async (
  userDetails,
  authDispatch,
  navigate,
  setErrorMsg,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    setPersistence(auth, browserLocalPersistence);
    const res = await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );
    await updateProfile(res.user, {
      displayName: `${userDetails.fName} ${userDetails.lName}`,
    });
    toast.success("Signup successful");
    authDispatch({ type: "SIGNUP", payload: [res.user, userDetails] });
    navigate("/home");
  } catch (error) {
    toast.error("Signup unsuccessful, try again!");
    switch (error.message) {
      case "Firebase: Error (auth/invalid-email).":
        setErrorMsg("Invalid Email Address");
        break;
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        setErrorMsg("Password should be at least 6 characters long");
        break;
      default:
        throw new Error(error);
    }
  } finally {
    setIsLoading(false);
  }
};
const addTask = async (taskData, taskManagerDispatch, setIsLoading) => {
  try {
    setIsLoading(true);
    const user = auth.currentUser;
    await setDoc(doc(db, "tasks", taskData._id), {
      _id: taskData._id,
      title: taskData.title,
      desc: taskData.desc,
      time: taskData.time,
      breakTime: taskData.breakTime,
      author: user.uid,
    });
    toast.success("Task Added");
    taskManagerDispatch({ type: "ADD_TASK", payload: taskData });
  } catch (error) {
    toast.error("Something went wrong, try again.");
    throw new Error(error);
  } finally {
    setIsLoading(false);
  }
};

const getTasks = async (taskManagerDispatch, setIsLoading) => {
  try {
    setIsLoading(true);
    const user = auth.currentUser;
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("author", "==", user.uid));
    const querySnapshot = await getDocs(q);
    taskManagerDispatch({ type: "GET_TASKS", payload: querySnapshot });
  } catch (error) {
    toast.error("Failed to fetch tasks, try reloading!");
    throw new Error(error);
  } finally {
    setIsLoading(false);
  }
};

const updateTask = async (updatedTask, taskManagerDispatch, setIsLoading) => {
  try {
    setIsLoading(true);
    const taskRef = doc(db, "tasks", updatedTask._id);
    await updateDoc(taskRef, updatedTask);
    taskManagerDispatch({ type: "ADD_TASK", payload: updatedTask });
    toast.success("Task Updated");
  } catch (error) {
    toast.error("Something went wrong, try again!");
    throw new Error(error);
  } finally {
    setIsLoading(false);
  }
};

const deleteTask = async (taskId, taskManagerDispatch, setIsLoading) => {
  try {
    setIsLoading(true);
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    taskManagerDispatch({ type: "REMOVE_TASK", payload: taskId });
    toast.success("Task Deleted");
  } catch (error) {
    toast.error("Delete failed, try again!");
    throw new Error(error);
  } finally {
    setIsLoading(false);
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
