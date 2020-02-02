const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
        itemsRes: [{type: Schema.Types.ObjectId, ref: 'RestaurantItem'}]
        // name: {type: String, required: true, unique: true},
        // value: {type: String, required: true, unique: true},
       
});

module.exports = mongoose.model('Restaurants', restSchema);