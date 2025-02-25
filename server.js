require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  extensions: [".js", ".jsx"],
});
require("dotenv").config();

const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default;

const app = express();

// Serve static files
app.use(express.static("public"));

// Handle SSR
app.get("*", (req, res) => {
  const appHtml = ReactDOMServer.renderToString(React.createElement(App));

  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React SSR Demo</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `;

  res.send(template);
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
