const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
module.exports = function(eleventyConfig) {
  //Always include src/ before file paths!
  eleventyConfig.addPassthroughCopy("src/assets/**");
  eleventyConfig.addPassthroughCopy("src/admin/**");
  eleventyConfig.addPassthroughCopy("src/fonts/**");
  eleventyConfig.addPassthroughCopy("src/projects/**");
  eleventyConfig.addPassthroughCopy("src/blog/post/post.css");
  eleventyConfig.addPassthroughCopy("src/*.html");
  eleventyConfig.addPassthroughCopy("src/*.css");
  eleventyConfig.addPassthroughCopy("src/*.js");
  eleventyConfig.addPassthroughCopy("src/*.ico");
  eleventyConfig.setQuietMode("true");
  eleventyConfig.addPlugin(directoryOutputPlugin);
  return {
    dir: {
      input: "src",
      output: "site"
    }
  };
};
  
