import React, { useState } from "react";
import { blogService } from "../services/blogs";

const NewBlogForm = ({ handleNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const handleAddBlog = (event) => {
    event.preventDefault();

    blogService
      .create({ title, author, url })
      .then((data) => {
        console.log(data);
        handleNotification("blog post succesfully added");
        setTitle("");
        setAuthor("");
        setUrl("");
        setBlogFormVisible(false);
      })
      .catch((error) => handleNotification("Error in adding blog post"));
  };

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>New blog post</button>
      </div>
      <div style={showWhenVisible}>
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
        <button
          onClick={() => {
            setBlogFormVisible(false);
            setTitle("");
            setAuthor("");
            setUrl("");
          }}
        >
          cancel
        </button>
      </div>
    </>
  );
};

export default NewBlogForm;
