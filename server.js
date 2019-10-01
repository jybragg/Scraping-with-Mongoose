var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
var router = express.Router();

require("./routes/routes")(router);
 
// Configure middleware
// Use morgan logger for logging requests
// app.use(logger("dev"));

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

// Make public a static folder
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(router);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoArticles"; 

mongoose.connect(db, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mongoose is connected!!")
  }
});


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
