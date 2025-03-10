require("dotenv").config();

const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/client.js", // Entry point for the client-side app
  output: {
    path: path.resolve(__dirname, "public"), // Output directory
    filename: "bundle.js", // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Use Babel presets
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve JS and JSX files
  },
  optimization: {
    usedExports: true, // Mark unused exports for tree shaking
    minimize: true, // Minify the output
  },
};
