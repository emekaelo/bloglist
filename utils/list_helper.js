const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => {
    return likes + sum;
  }, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
