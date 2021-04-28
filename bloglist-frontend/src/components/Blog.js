import React, { useState } from "react";
import { blogService } from "../services/blogs";
import jwt from "jsonwebtoken";

const Blog = ({ user, blog, blogs, setBlogs, handleNotification }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: "1rem",
    boxShadow: "1px 1px 10px #9692926b",
    marginBottom: ".5rem",
    borderRadius: 8,
    backgroundColor: visible ? "orange" : "white",
    transition: "background-color 1s",
  };

  const handleLike = () => {
    const decodedToken = jwt.decode(user.token);

    const newBlog = {
      user: decodedToken.id,
      likes: +blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    blogService.update(newBlog, blog.id).then((data) => {
      setBlogs(
        blogs.map(
          (otherBlog) => (otherBlog.id !== blog.id ? otherBlog : data) // put request not responding with updated data so updating blogs with input data but doing after a successful response
        )
      );
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ${blog.title} blog post`)
    ) {
      blogService.remove(blog.id).then(() => {
        setBlogs(blogs.filter((otherBlog) => otherBlog.id !== blog.id));
        handleNotification("Blog post deleted successfully");
      });
    }
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}{" "}
        <button data-testid="visible-btn" onClick={() => setVisible(!visible)}>
          {!visible ? "show" : "hide"}
        </button>{" "}
        <button onClick={handleDelete}>Delete</button>
      </span>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {" "}
            {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
        </div>
      )}
      {/* Using Togglable component which does not provide desired result
       <Togglable buttonLabel1="show" buttonLabel2="hide">
        {blog.url} {blog.likes} <button>Like</button>
      </Togglable> */}
    </div>
  );
};

export default Blog;
