
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var exphb = require("express-handlebars");

var app = express();

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function(req, res) {
  axios.get("https://old.reddit.com/r/webdev/").then(function(response) {
  var $ = cheerio.load(response.data);
  var results = [];
  $("p.title").each(function(i, element) {
    var title = $(element).text();
    var link = $(element).children().attr("href");
    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
  });
  res.send("Scrape Complete");
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});