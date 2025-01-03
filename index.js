const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const Database = require("./Database");
const db = new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create POST API to be able to cretate a new note
app.post("/notes", (req, res) => {
  const body = req.body;
  db.addNote(body)
    .then((data) => res.send(data))
    .catch((err) => res.status(505).send(err));
});
// Create GET API to be able to cretate a new note
app.get("/notes", (req, res) => {
  const { title } = req.query;
  if (title) {
    db.getNotesBtTitle(title)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err));
  } else {
    db.getNotes()
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err));
  }
});
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.getNoteById(id)
    .then((data) =>
      !data ? res.status(404).send("Nots of notes", id) : res.send(data)
    )
    .catch((err) => res.status(500).send(err));
});
// Update API for a specific note
app.put("/notes", (req, res) => {
  db.updateNote(req.body)
    .then((data) =>
      !data ? res.status(404).send("Nots of notes", id) : res.send(data)
    )
    .catch((err) => res.status(500).send(err));
});
// Delete API for a specific note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.deleteNote(id)
    .then((data) =>
      !data ? res.status(404).send("Nots of notes", id) : res.send(data)
    )
    .catch((err) => res.status(500).send(err));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
  db.connect();
});
