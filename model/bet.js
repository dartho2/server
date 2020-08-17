const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
        date: {type: String,  required: true },
        status: {type: Number, required: true },
        events: {type: Object, required: false },
        statusChanged: {type: Number, required: true },
        rate: {type: String, required: true }
      
        
        
});

module.exports = mongoose.model('Bet', betSchema);
