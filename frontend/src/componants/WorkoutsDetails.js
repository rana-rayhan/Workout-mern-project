import React from "react";
import { Link } from "react-router-dom";
import useWorkoutContext from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useUserContext from "../hooks/useUserContext";

const WorkoutsDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { state } = useUserContext();

  const handleDelete = async () => {
    // user authinticated check
    if (!state.user) {
      return;
    }

    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      } 
    );
    if (response.ok) {
      await response.json();
      dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete}>Delete</span>
      <Link to="/update" state={workout}>
        <button>Update</button>
      </Link>
    </div>
  );
};

export default WorkoutsDetails;
