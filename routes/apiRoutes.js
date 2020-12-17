// cant export so can i not require...?
const noteList = require("../db/db.json");
console.log(noteList)
const fs = require('fs')

// const noteList = []

module.exports = function(app) {
  
  app.get("/api/notes", function(req, res) {
    res.json(noteList);
     // read file instead of above ^? seems like both work
    //  fs.readFile('../db/db.json', 'utf8', (err, data) => {
    //   //  console.log(data)
    //   if (err) throw err;
    // })
  });


  app.post("/api/notes", function(req, res) {
    // no idea how to handle the id thing yet
    
    

    const newNote = {
      // id: id,
      title: req.body.title,
      text: req.body.text,
    }

    noteList.push(newNote)

    // MAYBE TRY FS.APPENDFILE?
    fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
      if (err) throw err;
      // id++
    })
    // does not work to add to db.json
    // noteList.push(newNote);
    res.json(true);
    // does this return the entire noteList?
    res.json(noteList)
    // not sure that this does
    return noteList
  
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function(req, res) {
  //   // Empty out the arrays of data
  //   tableData.length = 0;
  //   waitListData.length = 0;

  //   res.json({ ok: true });
  // });

  // Displays a single character, or returns false
  app.delete("/api/notes/:id", function(req, res) {
    // from youtube
    res.json(noteList.filter(note => note.id === parseInt(req.params.id)))

    // // from class
    // var chosen = req.params.id;

    // console.log(chosen);

    // for (var i = 0; i < characters.length; i++) {
    //   if (chosen === characters[i].routeName) {
    //     return res.json(characters[i]);
    //   }
    // }

    // return res.json(false);
  });
};
