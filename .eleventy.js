const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**");
  eleventyConfig.setQuietMode("true");
  eleventyConfig.addPlugin(directoryOutputPlugin);
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "site"
    }
  };
};
  