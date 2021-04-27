import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: "1rem",
    boxShadow: "0px 1px 10px #9692926b",
    marginBottom: 5,
    borderRadius: 8,
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
            {blog.likes} <button>Like</button>
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
