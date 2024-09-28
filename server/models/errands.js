const { Schema, model } = require('mongoose')

const schema = new Schema({
  item_name: {
    type: String
  },
  item_description: String,
  pickup_location: String,
  dropoff_location: String
}, { collection: "errands" })

module.exports = model('Errands', schema)