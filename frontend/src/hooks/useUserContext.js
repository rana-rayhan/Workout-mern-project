import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("Use Context error in -> useUserContext page");
  }
  return context;
};
export default useUserContext;
