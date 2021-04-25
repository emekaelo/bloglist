import React from "react";
import { blogService } from "../services/blogs";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  user,
  setUser,
  handleNotification,
}) => {
  const handleLogin = (event) => {
    event.preventDefault();
    blogService
      .login({ username, password })
      .then((data) => {
        setUser(data);
        setUsername("");
        setPassword("");
        window.localStorage.setItem("userDetails", JSON.stringify(data));
        handleNotification("Login successful");
      })
      .catch((error) => handleNotification("Wrong username or password"));
  };

  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
