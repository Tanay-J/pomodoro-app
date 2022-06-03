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
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
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
    const taskRef = collection(db, "tasks");
    await addDoc(taskRef, {
      _id: taskData._id,
      title: taskData.title,
      desc: taskData.desc,
      time: taskData.time,
      breakTime: taskData.breakTime,
      author: user.uid,
    });
    taskManagerDispatch({ type: "ADD_TASK", payload: taskData });
    taskManagerDispatch({ type: "TOGGLE_MODAL" });
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

const updateTask = async (taskId, updatedTask) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedTask);
  } catch (error) {
    console.error("Error getting tasks: ", error);
  }
};

export {
  addTask,
  getTasks,
  handleLogin,
  handleLogout,
  handleSignup,
  updateTask,
};
