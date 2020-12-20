
const fs = require('fs')
const uuid = require('uuid')


module.exports = function(app) {
  
  app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      res.json(data)
    })
  });


  app.post("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
      }
      data = JSON.parse(data)
      data.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
        if (err) throw err;
      
      })
      res.json(data)
    })
  
  });


  app.delete("/api/notes/:id", (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      data = JSON.parse(data)
      const updatedNoteList = data.filter(note => note.id !== req.params.id)
      res.json(updatedNoteList)

      fs.writeFile('./db/db.json', JSON.stringify(updatedNoteList), (err) => {
        if (err) throw err;
      })
    })

  });
};
