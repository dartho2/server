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
        price: {type: Number, get: getPrice, set: setPrice, required: true },
        unit: {type: String, required: true}
   
});
function getPrice(num){
  return (num/100).toFixed(2);
}

function setPrice(num){
  return num*100;
}

module.exports = mongoose.model('Products', productSchema);