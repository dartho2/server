const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
       
});

module.exports = mongoose.model('Workers', workerSchema);