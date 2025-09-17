const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const taskSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    task: {
      type: String,
      required: true,
      trim: true
    },
    started: {
      type: Date,
      default: Date.now
    },
    due: {
      type: Date
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
