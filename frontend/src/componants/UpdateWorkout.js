import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWorkoutContext from "../hooks/useWorkoutsContext";
import useUserContext from "../hooks/useUserContext";

const UpdateWorkout = () => {
  const { dispatch } = useWorkoutContext();
  const location = useLocation((state) => state);
  const navigate = useNavigate();
  const { state } = useUserContext();

  const [_id] = useState(location.state._id);
  const [title, setTitle] = useState(location.state.title);
  const [reps, setReps] = useState(location.state.reps);
  const [load, setLoad] = useState(location.state.load);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // user authinticated check
    if (!state.user) {
      return;
    }

    const response = await fetch("http://localhost:4000/api/workouts/" + _id, {
      method: "PATCH",
      body: JSON.stringify({ title, reps, load }),
      //verifying user auth
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      navigate("/", { replace: true });
      setError(null);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <div>
        <label htmlFor="title">Excersize Title: </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="reps">Reps: </label>
        <input
          type="number"
          required
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="load">Load (in Kg): </label>
        <input
          type="number"
          required
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />
      </div>
      <button type="submit">Update Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateWorkout;
