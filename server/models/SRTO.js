var mongoose = require('mongoose');

// Create the MovieSchema.
var SRSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    raisedBy: {
        type: String
    },
    raisedDate: {
        type: String,
        default: new Date
    },
    srNo: {
        type: String
    },
    remark: {
        type: String
    },
    srDoc: {
        type: String
    },
    requestList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'request'
    }]
});

// Export the model.
module.exports = mongoose.model('sr', SRSchema);


