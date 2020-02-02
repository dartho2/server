const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
        value: {type: String, required: true, unique: true},
       
});

module.exports = mongoose.model('Restaurants', restSchema);