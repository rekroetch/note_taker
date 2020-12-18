
const noteList = require("../db/db.json");
console.log(noteList)
const fs = require('fs')
const uuid = require('uuid')


module.exports = function(app) {
  
  app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      res.json(noteList);
    })
  });


  app.post("/api/notes", function(req, res) {
    
    const newNote = {
      id: uuid.v4(),
      title: req.body.title,
      text: req.body.text,
    }

    noteList.push(newNote)

    fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
      if (err) throw err;
    
    })

    res.json(true);
    // does this return the entire noteList?
    res.json(noteList)
    // not sure that this does
    return noteList
  
  });


  app.delete("/api/notes/:id", (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const updatedNoteList = noteList.filter(note => note.id !== req.params.id)
      res.json(updatedNoteList)

      fs.writeFile('./db/db.json', JSON.stringify(updatedNoteList), (err) => {
        if (err) throw err;
      })
    })
    
    // from youtube
    // res.json(noteList.filter(note => note.id === parseInt(req.params.id)))

  });
};
