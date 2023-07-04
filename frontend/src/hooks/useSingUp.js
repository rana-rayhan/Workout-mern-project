import { useState } from "react";
import useUserContext from "./useUserContext";

const useSingUp = () => {
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useUserContext();

  const singUp = async (username, email, password) => {
    setLoading(true);
    setError(null);
    const response = await fetch("http://localhost:4000/api/user/singup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, email, password }),
    });
    //user data
    const userData = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(userData.error);
    }
    if (response.ok) {
      //save data to local storage
      localStorage.setItem("user", JSON.stringify(userData));
      // dispatch action sor singup || login
      dispatch({ type: "LOGIN", payload: userData });

      setLoading(false);
    }
  };

  return { isLoading, error, singUp };
};

export default useSingUp;
