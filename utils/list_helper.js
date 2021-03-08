const dummy = (blogs) => {
  return 1;
};

// calculates the sum of like for all blog posts in array
const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => {
    return likes + sum;
  }, 0);
};

// Returns the post with most likes
const favoriteBlog = (blogs) => {
  let mostLikes = blogs[0].likes;
  let favBlog = blogs[0];
  for (let i = 0; i < blogs.length; i++) {
    if (mostLikes < blogs[i].likes) {
      mostLikes = blogs[i].likes;
      favBlog = blogs[i];
    }
  }
  delete favBlog._id;
  delete favBlog.url;
  delete favBlog.__v;
  return favBlog;
};

// Returns the author who has the highest amount of blogs
const mostBlogs = (blogs) => {
  // Define the output format
  let mostNumOfBlogs = {
    author: "",
    blogs: 0,
  };
  // Map out authors into an array
  const authors = blogs.map((blog) => blog.author);

  // Loop through & filter each author to find the number of times it appears
  for (const author of authors) {
    numOfAuthors = authors.filter((item) => item === author).length;
    if (mostNumOfBlogs.blogs < numOfAuthors) {
      mostNumOfBlogs.author = author;
      mostNumOfBlogs.blogs = numOfAuthors;
    }
  }
  return mostNumOfBlogs;
};

// Returns the author who has the most amount of likes
const mostLikes = (blogs) => {
  // Define the output format
  let mostBlogLikes = {
    author: "",
    likes: 0,
  };
  for (const blog of blogs) {
    // Filter out blogs of authors into an array
    const authorBlogs = blogs.filter((post) => post.author === blog.author);
    let likesSum = totalLikes(authorBlogs);
    if (mostBlogLikes.likes < likesSum) {
      mostBlogLikes.author = blog.author;
      mostBlogLikes.likes = likesSum;
    }
  }
  return mostBlogLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
