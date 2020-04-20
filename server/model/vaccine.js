const mongoose = require('mongoose');

const VaccineSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  abbrevName: {
    type: String,
    required: true
  },
  doses: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Vaccine', VaccineSchema, 'vaccine');
