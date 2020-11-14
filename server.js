const express = require("express");
var path = require("path");
var PORT = process.env.PORT || 3000;
var app = express();
// Serving static content for the app from the "public" directory in the application directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
//Parsing request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Importing routes, granting server access to them
const routes = require("./controllers/burgers_controllers.js");
app.use(routes);
app.listen(PORT, function () {
  console.log("app now listening at local port:" + PORT);
});