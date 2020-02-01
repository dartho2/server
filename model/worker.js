const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
        users: {type: Array, required: true}
       
});

module.exports = mongoose.model('Workers', workerSchema);