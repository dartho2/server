const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rest = require("./restaurant");

const restItemSchema = new Schema({
        name: {type: String, required: true, unique: true},
        value: {type: String, required: true, unique: true},
       
});
restItemSchema.pre('remove', function (next) {
        const restaurant = this;
    
        Rest.updateMany({}, {$pullAll: {itemsres: [restaurant._id]}})
            .then(() => next())
            .catch(err => console.log(JSON.stringify(err)));
    });
module.exports = mongoose.model('RestaurantItem', restItemSchema);