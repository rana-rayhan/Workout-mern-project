import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useUserContext from "../hooks/useUserContext";

const NavBar = () => {
  const { logout } = useLogout();
  const { state } = useUserContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout List</h1>
        </Link>
        <nav>
          {state.user && (
            <div>
              <span>{state.user.username}</span>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
          {!state.user && (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/singup">Sing Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
