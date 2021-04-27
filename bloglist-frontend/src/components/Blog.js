import React, { useState } from "react";
import { blogService } from "../services/blogs";
import jwt from "jsonwebtoken";

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: "1rem",
    boxShadow: "1px 1px 10px #9692926b",
    marginBottom: ".5rem",
    borderRadius: 8,
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
    console.log(newBlog);
    blogService.update(newBlog, blog.id).then((data) => {
      console.log(data);
      setBlogs(
        blogs.map(
          (otherBlog) =>
            otherBlog.id !== blog.id ? otherBlog : { ...newBlog, id: blog.id } // put request not responding with updated data so updating blogs with input data but doing after a successful response
        )
      );
    });
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>
          {!visible ? "show" : "hide"}
        </button>
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
