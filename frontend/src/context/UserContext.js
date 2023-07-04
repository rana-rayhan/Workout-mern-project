import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  useEffect(() => {
    // getting token from local storage
    const userToken = JSON.parse(localStorage.getItem("user"));

    if (userToken) {
      dispatch({ type: "LOGIN", payload: userToken });
    }
  }, []);

  console.log("UserContext", state);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
