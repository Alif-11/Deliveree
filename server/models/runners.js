const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: String
}, { collection: "runners" })

module.exports = model('Runners', schema)