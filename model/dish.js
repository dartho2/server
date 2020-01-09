const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
        price: {type: String,  required: true },
        price_p: {type: String,  required: true },
        products: {
            type: Object,  required: false }
});

module.exports = mongoose.model('Dishes', dishSchema);