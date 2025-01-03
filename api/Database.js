const mongoose = require("mongoose");
const Note = require("../schemas/node");

class Database {
  constructor() {
    // this.URL = "mongodb://127.0.0.1:27017/notaty";
    this.URL =
      process.env.MONGODB ||
      "mongodb+srv://admin:admin123@cluster0.9b4we.mongodb.net/notaty?retryWrites=true&w=majority&appName=Cluster0";
  }
  connect() {
    mongoose
      .connect(this.URL)
      .then(() => {
        console.log("Database Connecting Successfully...");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addNote(note) {
    return new Promise((resolve, reject) => {
      note["createDate"] = new Date();
      note["updateDate"] = new Date();
      let newNote = new Note(note);
      newNote
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getNotes() {
    return new Promise((resolve, reject) => {
      Note.find({})
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getNoteById(id) {
    return new Promise((resolve, reject) => {
      Note.findById(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateNote(note) {
    return new Promise((resolve, reject) => {
      note["updateDate"] = new Date();
      Note.findByIdAndUpdate(note["_id"], note)
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  deleteNote(id) {
    return new Promise((resolve, reject) => {
      Note.findByIdAndDelete(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getNotesBtTitle(noteTitle) {
    return new Promise((resolve, reject) => {
      const query = { title: { $regex: new RegExp(noteTitle, "i") } };
      Note.find(query)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Database;
