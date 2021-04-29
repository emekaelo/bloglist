import React, { useState } from "react";
import { blogService } from "../services/blogs";

const Blog = ({ updateLike, blog, blogs, setBlogs, handleNotification }) => {
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
    const newBlog = {
      likes: +blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    updateLike(newBlog, blog.id);
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ${blog.title} blog post`)
    ) {
      blogService
        .remove(blog.id)
        .then(() => {
          handleNotification("Blog post deleted successfully");
          setBlogs(blogs.filter((otherBlog) => otherBlog.id !== blog.id));
        })
        .catch(() =>
          handleNotification(
            "Error!, can't delete a blog you didn't create",
            "error"
          )
        );
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
            {blog.likes}{" "}
            <button
              className="like-button"
              data-testid="like-btn"
              onClick={handleLike}
            >
              Like
            </button>
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
