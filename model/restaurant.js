const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
        itemsres: [{type: Schema.Types.ObjectId, ref: 'RestaurantItem'}]
        // name: {type: String, required: true, unique: true},
        // value: {type: String, required: true, unique: true},
       
});
const RestaurantItemSchema = new Schema({
     name: {type: String, required: true, unique: true},
     value: {type: String, required: true, unique: true},
});
module.exports  = mongoose.model('RestaurantItem', RestaurantItemSchema);
module.exports = mongoose.model('Restaurants', restSchema);
