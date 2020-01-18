const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        category:  {type: String, required: true},
        foodCost: {type: String,  required: true },
        fC: {type: String,  required: true },
        vat: {type: String,  required: true },
        productMarginFC: {type: String,  required: true },
        bruttoPrice: {type: String,  required: true },
        productMargin: {type: String,  required: true },
        coating: {type: String,  required: true },
        products: {type: Object,  required: false }
});

module.exports = mongoose.model('Dishes', dishSchema);