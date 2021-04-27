import PropTypes from "prop-types";
import React, { useState } from "react";

const NewBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = (event) => {
    event.preventDefault();
    handleAddBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Add new blog post</h2>
      <form onSubmit={addBlogHandler}>
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
    </>
  );
};

NewBlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
