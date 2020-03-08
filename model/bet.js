const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
        date: {type: String,  required: true },
        status: {type: String, required: true },
        events: {type: Object,  required: true }
      
        
        
});

module.exports = mongoose.model('Bet', betSchema);