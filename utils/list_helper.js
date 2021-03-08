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
  let favoriteBlog = blogs[0];
  for (let i = 0; i < blogs.length; i++) {
    if (mostLikes < blogs[i].likes) {
      mostLikes = blogs[i].likes;
      favoriteBlog = blogs[i];
    }
  }
  delete favoriteBlog._id;
  delete favoriteBlog.url;
  delete favoriteBlog.__v;
  return favoriteBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
