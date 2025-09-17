const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')

const notes = require('./notes')

yargs.version('1.1.0')

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Removing a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.readNote(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'Listing all notes',
  handler (argv) {
    notes.listNotes()
  }
})

yargs.parse()
