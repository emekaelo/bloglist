import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import { blogService } from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleLogout = () => {
    blogService.logout();
    setUser(null);
  };

  const handleAddBlog = (event) => {
    event.preventDefault();

    blogService
      .create({ title, author, url })
      .then((data) => console.log(data));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  if (user === null) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
      />
    );
  } else {
    return (
      <>
        <h2>blogs</h2>
        <span>{user.username} is logged in.</span>
        <button onClick={handleLogout}>Logout</button>
        <h2>Add new blog post</h2>
        <form onSubmit={handleAddBlog}>
          <label>Title</label>
          <input
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <label>Author</label>
          <input
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <label>Url</label>
          <input
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <button type="submit">Create</button>
        </form>
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  }
};

export default App;
