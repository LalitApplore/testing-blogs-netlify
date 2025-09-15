const blogs = require("./blogs.json");

module.exports = () => {
  // Collect unique categories from blogs.json
  const unique = [...new Set(blogs.map(blog => blog.category))];
  return unique;
};
