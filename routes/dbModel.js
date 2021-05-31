const mongoose = require('mongoose')

// The basic DB schema format in which the response will be expected/returned
const museumModel = mongoose.Schema({
  museumData: {
    month: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    museum: {
      type: String,
      required: true
    },
    visitors: {
      type: Number,
      required: true
    }
  }
})

module.exports = mongoose.model('museumvisitors', museumModel)
