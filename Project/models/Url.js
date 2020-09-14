const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id: {type: String},
    url: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    clicks:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('url', urlSchema);