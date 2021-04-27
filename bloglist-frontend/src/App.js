import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { blogService } from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Persist user login
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("userDetails");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    blogService
      .login({ username, password })
      .then((data) => {
        setUser(data);
        blogService.setToken(data.token);
        setUsername("");
        setPassword("");
        window.localStorage.setItem("userDetails", JSON.stringify(data));
        handleNotification("Login successful");
      })
      .catch((error) => handleNotification("Wrong username or password"));
  };

  const handleLogout = () => {
    blogService.logout();
    setUser(null);
    handleNotification("Successfully logged out");
  };

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  if (user === null) {
    return (
      <>
        <Notification message={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  } else {
    return (
      <>
        <Notification message={notification} />
        <h2>blogs</h2>
        <span>{user.username} is logged in.</span>
        <button onClick={handleLogout}>Logout</button>
        <NewBlogForm handleNotification={handleNotification} />
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  }
};

export default App;
