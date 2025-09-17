const mongoose = require('mongoose')
const validator = require('validator')
const keys = require('../config/keys')

mongoose.connect(keys.mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
