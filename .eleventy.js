const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // Copy CSS directly to output
  eleventyConfig.addPassthroughCopy("src/css");

  // Copy assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Copy JS
  eleventyConfig.addPassthroughCopy("src/js");

  // Copy Robot.txt
    eleventyConfig.addPassthroughCopy("src/robot-blogs.txt");
  
  eleventyConfig.addCollection("categories", function(collectionApi) {
  let blogs = collectionApi.getFilteredByGlob("src/blogs/*.md"); // or your JSON
  let categories = new Set();
  blogs.forEach(b => {
    if (b.data.category) categories.add(b.data.category);
  });
  return [...categories];
});


  // Create "blogs" collection
  eleventyConfig.addCollection("blogs", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blogs/*.md");
  });

  // Add a date filter
// Add a date filter
eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
  if (!dateObj) return "";

  let dt;

  // If it's already a JS Date object
  if (dateObj instanceof Date) {
    dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
  } 
  // If it's a string like "2025-08-12"
  else if (typeof dateObj === "string") {
    dt = DateTime.fromISO(dateObj, { zone: "utc" });
  } 
  // If it's already a Luxon DateTime (edge case)
  else if (dateObj.toISO) {
    dt = dateObj;
  } 
  else {
    return "";
  }

  return dt.toFormat(format);
});


  // Add truncate filter
eleventyConfig.addFilter("truncate", (str, len = 35) => {
    if (!str) return "";
    return str.length > len ? str.slice(0, len) + "..." : str;
  });

    //categorzing blogs based on category
  //   eleventyConfig.addFilter("", (str, len = 15) => {
  //   if (!str) return "";
  //   return str.length > len ? str.slice(0, len) + "..." : str;
  // });
  // Configure markdown-it with markdown-it-attrs
  let markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
  };
};
