const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
        items: {type: Array, required: true}
       
});

module.exports = mongoose.model('Equipments', equipmentSchema);