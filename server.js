var express = require("express");
var path = require("path");
var app = express();
var PORT = 3000;
var fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  // var jsonContent = JSON.parse(content);
  // console.log(jsonContent);
});

app.get("/api/notes", function(req, res) {
  var content = fs.readFileSync("db.json");
  var jsonContent = JSON.parse(content);
  return res.json(jsonContent);
});

// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

app.post("/api/notes", function(req, res) {
  var newNote = req.body;

  console.log(newNote);

  // characters.push(newcharacter);

  // res.json(newcharacter);
});

app.delete("/api/notes/:id", function(req, res) {

});

// wild card route goes at the bottom
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
