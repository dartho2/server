const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
        date: {type: String,  required: true },
        events: [{
        name: {type: String, required: true},
        type: {type: String},
        typeYT:  {type: String},
        typeBT:  {type: String},
        typeVI: {type: String},
        date: {type: String,  required: true },
        dateControl: {type: String,  required: true },
        league: {type: String,  required: true },
        idEvent: {type: String,  required: true },
        win: {type: String,  required: true },
        vot1: {type: String,  required: false },
        votX: {type: String,  required: false },
        vot2: {type: String,  required: false }
        }]
      
        
        
});

module.exports = mongoose.model('Bet', betSchema);