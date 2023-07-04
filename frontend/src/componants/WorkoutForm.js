import React, { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutsContext";
import useUserContext from "../hooks/useUserContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutContext();
  const { state } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // user authinticated check
    if (!state.user) {
      setError("You must be logged in");
      return;
    }

    const workoutData = { title, reps, load };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workoutData),
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
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
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
      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
