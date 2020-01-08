const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
        description: {type: String, default: ""},
        label: {type: String, required: true},
        logo: {type: String, default: null},
        image: {type: Array, default: {}},
        style: {type: Object, default: {}},
        active: {type: Boolean, default: true},
        price: {type: String,  required: true },
        unit: {type: String, required: true},
        weight: {type: String, required: true},
        vat: {type: Number, required: true},
        totalPrice: {type: String, required: true},
        product_data: {type: String,required: true},
        history: {type: Array, default: []},
   
});
// // Getter
// productSchema.path('price').get(function(num) {
//     return (num / 100).toFixed(2);
//   });
  
//   // Setter
//   productSchema.path('price').set(function(num) {
//     return num * 100;
//   });

module.exports = mongoose.model('Products', productSchema);