// const blogs = require("./blogs.json");

// module.exports = () => {
//   // Collect unique categories from blogs.json
//   const unique = [...new Set(blogs.map(blog => blog.Categories[0]))];
//   return unique;
// };


const blogs = require("./blogs.json");

module.exports = () => {
  const slugify = (text) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Flatten all categories and remove duplicates (case-insensitive)
  const allCategories = blogs.flatMap(blog => blog.Categories || []);
  const unique = [...new Map(allCategories.map(cat => [slugify(cat), cat])).values()];

  return unique; // now each display name appears only once
};
