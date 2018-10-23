const fs = require('fs');

const pth = 'notes-data.json';

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync(pth);
    return JSON.parse(notesString);
  } catch(e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync(pth, JSON.stringify(notes));
};

var addNote = (title, body) => {
  //console.log('Adding note', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title );

  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  //console.log('Getting all notes');
  return fetchNotes();
};

var getNote = (title) => {
  console.log('Reading note ', title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title );
  return filteredNotes[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();

  // fileter notes, removing the one with matching title
  var filteredNotes = notes.filter((note) => {
    //console.log(`(note.title !== title) --> ${note.title !== title}` );
    return note.title !== title;
  });
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  //debugger;
  console.log('----');
  console.log(`Note title: ${note.title}`);
  console.log(`Note body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
