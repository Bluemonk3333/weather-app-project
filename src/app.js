const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8180;

//* access public directory
const staticPath = path.join(__dirname, "../public");
//* access templates directory
const viewsPath = path.join(__dirname, "../templates/views");
const parsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(staticPath));

hbs.registerPartials(parsPath);

//* Page Routing
app.get("/", (req, resp) => {
  resp.render("index");
});
app.get("/about", (req, resp) => {
  resp.render("about");
});
app.get("/weather", (req, resp) => {
  resp.render("weather");
});
app.get("*", (req, resp) => {
  resp.render("404error", {
    errorMsg: "Oops! Page not found...",
  });
});

//* Server is listening
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening on port: ${port}`);
  }
});
