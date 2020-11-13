const express = require("express");

var path = require("path");
var PORT = process.env.PORT || 3000;
var app = express();

//Serving static material
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

//Parse request body (JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Importing the routes and granting server access to them
const routes = require("./controllers/burgers_controllers.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("app now listening at local port:" + PORT);
});
