const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
        itemsres:  {type: Object, required: false}
        // name: {type: String, required: true, unique: true},
        // value: {type: String, required: true, unique: true},
       
});
module.exports = mongoose.model('Restaurants', restSchema);
