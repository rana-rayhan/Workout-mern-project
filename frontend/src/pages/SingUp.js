import React, { useState } from "react";
import useSingUp from "../hooks/useSingUp";

const SingUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { singUp, isLoading, error } = useSingUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await singUp(username, email, password);
  };

  return (
    <form className="singup" onSubmit={handleSubmit}>
      <h3>Sing Up</h3>
      <div>
        <label>User Name:</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button disabled={isLoading}>Sing Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SingUp;
