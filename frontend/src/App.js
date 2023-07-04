import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages & componants
import Home from "./pages/Home";
import NavBar from "./layouts/NavBar";
import UpdateWorkout from "./componants/UpdateWorkout";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import useUserContext from "./hooks/useUserContext";

const App = () => {
  const { state } = useUserContext();
  const { user } = state;
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/update"
              element={user ? <UpdateWorkout /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/singup"
              element={!user ? <SingUp /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
