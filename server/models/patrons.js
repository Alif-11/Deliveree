const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: String
}, { collection: "patrons" })

module.exports = model('Patrons', schema)