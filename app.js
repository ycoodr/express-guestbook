var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(request, response){
  response.render("index");
});

app.get("/new-entry", function(request, response){
  response.render("new-entry");
});

app.post("/new-entry", function(request, response){
  if(!request.body.title || !request.body.body){
    response.status(400).send("Записи должны иметь заголовок и сообщения");
    return;
  }

  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/");
});

app.use(function(request, response){
  response.status(404).render("404");
});

// http.createServer(app).listen(3000, function(){
//   console.log("Работаем....");
// });

var server_port = process.env.PORT || 80;
var server_host = '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Работаем на %d', server_port);
});
