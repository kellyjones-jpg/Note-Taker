var express = require("express");
var path = require("path");
var app = express();
var PORT = 3000;
var fs = require("fs");
var uuidv4 = require("uuid/v4");
var util = require("util");

fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var note_file = "db.json"

function getAllNotes() {
  var content = fs.readFileSync(note_file);
  var jsonContent = JSON.parse(content);
  return jsonContent;
}

function saveOneNote(addMe) {
  var temp_uuid = uuidv4();
  var all_notes = getAllNotes();
  addMe.id = temp_uuid;

  // add to notes file
  all_notes.push(addMe)
  fs.writeFileSync(note_file, JSON.stringify(all_notes));

  return true;
}

app.get("/notes", function(req, res) {
  console.log("notes route hit");
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(getAllNotes());
});

app.post("/api/notes", function(req, res) {
  var saveNote = req.body;
  var isAdded = saveOneNote(saveNote);

  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.delete("/api/notes/:id", function(req, res) {
  console.log(req.params.id)

  fs.readFileAsync(note_file, 'utf8')
   .then(function(data)
    {
      var x = JSON.parse(data);
      x = x.filter(item => item.id != req.params.id);
      x = JSON.stringify(x);

      console.log(x);

      fs.writeFileAsync(note_file, x)
        .then(function (err)
          {
            if (err) console.log(err);
            console.log("Deleted!")
            res.status(200).send()
          }
        )
    }
  )
});

// wild card route goes at the bottom
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)
  });

