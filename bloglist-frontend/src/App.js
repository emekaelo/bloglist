import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
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

  const blogFormRef = useRef();

  const handleAddBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then((data) => {
        blogFormRef.current.toggleVisibility();
        console.log(data);
        setBlogs(blogs.concat(data));
        handleNotification("blog post succesfully added");
      })
      .catch(() => handleNotification("Error in adding blog post"));
  };

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
      .catch(() => handleNotification("Wrong username or password"));
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

  const handleLike = (updatedBlog, blogId) => {
    blogService.update(updatedBlog, blogId).then((data) => {
      setBlogs(
        blogs.map((otherBlog) => (otherBlog.id !== blogId ? otherBlog : data))
      );
    });
  };

  const handleSortAsc = () => {
    const tempBlogArr = [...blogs];
    tempBlogArr.sort((a, b) => a.likes - b.likes);
    setBlogs(tempBlogArr);
  };
  const handleSortDesc = () => {
    const tempBlogArr = [...blogs];
    tempBlogArr.sort((a, b) => b.likes - a.likes);
    setBlogs(tempBlogArr);
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
        <Togglable
          ref={blogFormRef}
          buttonLabel1="new note"
          buttonLabel2="cancel"
        >
          <NewBlogForm handleAddBlog={handleAddBlog} />
        </Togglable>
        <br />
        <button onClick={handleSortAsc}>sort by likes low to high</button>
        <button onClick={handleSortDesc}>sort by likes high to low</button>
        <br />
        {blogs.map((blog) => (
          <Blog
            updateLike={handleLike}
            user={user}
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            handleNotification={handleNotification}
          />
        ))}
      </>
    );
  }
};

export default App;
