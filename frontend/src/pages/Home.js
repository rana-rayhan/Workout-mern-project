import React, { useEffect } from "react";
import useWorkoutContext from "../hooks/useWorkoutsContext";
import useUserContext from "../hooks/useUserContext";

// pages and componants
import WorkoutsDetails from "../componants/WorkoutsDetails";
import WorkoutForm from "../componants/WorkoutForm";

const Home = () => {
  // useContext for set workouts data
  const { workouts, dispatch } = useWorkoutContext();
  const { state } = useUserContext();

  useEffect(() => {
    // fetch workouts data
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const workoutData = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: workoutData });
      }
    };
    //call fecth workout function
    if (state.user) {
      fetchWorkouts();
    }
  }, [dispatch, state.user]);

  return ( 
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
