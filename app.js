const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const setTitleOptions = {
  describe: 'Title of note', demand: true, alias: 't'
};
const setBodyOptions = {
  describe: 'Body of note', demand: true, alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: setTitleOptions,
    body: setBodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read note', {
    title: setTitleOptions
  })
  .command('remove', 'Remove a note', {
    title: setTitleOptions
  })
  .help()
  .argv;

var command = argv._[0]; //process.argv[2];

function main(cmd) {
    var comnds = {
      'add': function () {

        var note = notes.addNote(argv.title, argv.body);

        if(typeof note === "undefined") { //_.isString(note)
          console.log("That note already exists. Please use a unique name.");
          return;
        }
        notes.logNote(note);
      },
      'list': function () {

        var allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach( (note) => notes.logNote(note) );
      },
      'read': function () {

        var noteToRead = notes.getNote(argv.title);

        if (noteToRead.length === 0) {
          console.log(`Note not found.`);
        } else {
          console.log(`noteToRead = ${noteToRead.title}`);
          notes.logNote(noteToRead);
        }
      },
      'remove': function () {

        var noteRemoved = notes.removeNote(argv.title);
        var message = noteRemoved ? 'Note was removed' : 'Note not found';
        console.log(`Message: ${message}`);
      },
      '': function() {
        console.log("Type --help to see a list of required options");
      }
    };
    return comnds[cmd]();
}

main(command);
