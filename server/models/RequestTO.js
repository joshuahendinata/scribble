var mongoose = require('mongoose');

// Create the MovieSchema.
var RequestSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
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
    type: String
  },
  _sr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SR'
  }
});

// Export the model.
module.exports = mongoose.model('request', RequestSchema);


