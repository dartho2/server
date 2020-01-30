const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const graphicSchema = new Schema({
    
        date: {type: String, required: true, unique: true},
        items: {type: Array,  required: true }
});

module.exports = mongoose.model('Graphics', graphicSchema);