const { Schema, model } = require('mongoose')
const ErrandsModel = require('./errands')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
  errandsCreated: [{ type: Schema.Types.ObjectId, ref: "Errands" }]
}, { collection: "patrons" })

module.exports = model('Patrons', schema)