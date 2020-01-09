const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
        description: {type: String, default: ""},
        image: {type: String, default: ""},
        nettoPrice: {type: String,  required: true },
        unit: {type: String, required: true},
        weight: {type: String, required: true},
        vat: {type: Number, required: true},
        bruttoPrice: {type: String, required: true},
        productDate: {type: String,required: true},
        supplier: {type: String,required: true},
        history: {type: Object,
                required: true},
   
});
productSchema.pre('findByIdAndUpdate', function (next) {
        this.options.runValidators = true;
        next();
    });
module.exports = mongoose.model('Products', productSchema);