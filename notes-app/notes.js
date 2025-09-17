const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green('Note added!'))
  } else {
    console.log(chalk.red('Note title taken!'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const notesAfterRemoval = notes.filter(note => {
    return note.title !== title
  })
  if (notesAfterRemoval.length !== notes.length) {
    saveNotes(notesAfterRemoval)
    console.log(chalk.green('Note removed!'))
  } else {
    console.log(chalk.red('Note title not found!'))
  }
}

const listNotes = () => {
  console.log(chalk.green('YOUR NOTES: '))
  const notes = loadNotes()
  if (notes.length > 0) {
    notes.forEach(note => {
      console.log(chalk.green('Title: ' + note.title + '\tBody: ' + note.body))
    })
  } else {
    console.log(chalk.red('No notes found'))
  }
}

const readNote = title => {
  const notes = loadNotes()
  const notesFound = notes.filter(note => {
    return note.title === title
  })
  if (notesFound.length > 0) {
    notesFound.forEach(note => {
      console.log(chalk.green('Title: ' + note.title + '\tBody: ' + note.body))
    })
  } else {
    console.log(chalk.red('Note title not found!'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
