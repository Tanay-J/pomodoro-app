export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        userData: {
          email: action.payload.email,
          displayName: action.payload.displayName,
        },
        uid: action.payload.uid,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userData: {
          email: "",
          displayName: "",
        },
        uid: "",
      };
    case "SIGNUP":
      const [currentUser, userDetails] = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        userData: {
          email: userDetails.email,
          displayName: `${userDetails.fName} ${userDetails.lName}`,
        },
        uid: currentUser.uid,
      };
    default:
      break;
  }
};
