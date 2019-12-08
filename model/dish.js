const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    
        name: {type: String, required: true, unique: true},
        price: {type: String,  required: true },
        price_p: {type: String,  required: true },
        products: {
            type: Object,  required: false 
            // name: {type: String, required: true},
            // unit: {type: String, required: true},
            // price: {type: String, required: true},
            // productweight: {type: String, required: true},
            // valueproduct: {type: String, required: true},
            // weight: {type: String, required: true} 
        },
        
        
        
   
});
// // Getter
// productSchema.path('price').get(function(num) {
//     return (num / 100).toFixed(2);
//   });
  
//   // Setter
//   productSchema.path('price').set(function(num) {
//     return num * 100;
//   });

module.exports = mongoose.model('Dishes', dishSchema);