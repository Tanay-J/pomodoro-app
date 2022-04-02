export function taskManagerReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, showModal: !state.showModal, taskToEdit: {} };
    case "ADD_TASK":
      return state.taskToEdit._id
        ? {
            ...state,
            taskList: state.taskList.map((task) =>
              task._id === action.payload._id ? action.payload : task
            ),
            showModal: false,
            taskToEdit: {},
          }
        : {
            ...state,
            taskList: [...state.taskList, action.payload],
            showModal: false,
          };
    case "REMOVE_TASK":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task._id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        showModal: true,
        taskToEdit: state.taskList.reduce(
          (acc, curr) =>
            curr._id === action.payload._id ? action.payload : acc,
          {}
        ),
      };
    case "SHOW_TIMER":
      return {
        ...state,
        showTimer: true,
      };
    default:
      break;
  }
}
