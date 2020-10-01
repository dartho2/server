const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
//         itemsres:  {type: Object, required: false}
        name: {type: String, required: true, unique: true},
        value: {type: String, required: true, unique: true},
        restaurant: {type: String, required: true, unique: false},
       
});
module.exports = mongoose.model('Restaurants', restSchema);
