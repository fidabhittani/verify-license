import * as React from "react";

export const defaultUserContext = {
  username: "",
  email: "",
  id  : "",
  firstname: "",
  lastName: "",
  roles: [],
  authenticated: false,
};

export const UserContext = React.createContext(defaultUserContext);

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...action.payload,
      };
    case "CLEAR_USER":
      return defaultUserContext;
    default:
      return state;
  }
};
