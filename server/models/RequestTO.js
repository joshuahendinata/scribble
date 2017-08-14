const mongoose = require('mongoose');

// Create the MovieSchema.
const RequestSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  incidentNo: {
    type: String
  },
  description: {
    type: String
  },
  instruction: {
    type: String
  },
  requestCategory: {
    type: String
  },
  requestedBy: {
    type: String
  },
  requestDate: {
    type: Date,
    default: new Date()
  },
  requestStatus: {
    type: String,
    default: 'PENDING'
  },
  _sr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SR'
  }
});

// Export the model.
module.exports = mongoose.model('request', RequestSchema);


