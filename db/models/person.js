const mongoose = require('mongoose');

const person = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

module.exports = personSchema = mongoose.model('person', person);