const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expertSchema = new Schema({
    
        name: {type: String, required: true, unique: false},
        description: {type: String, required: true},
        res: [{
            day: {type: Date, unique:true, required: true},
            hours: [{
                h: {type: String, required: true},
                res: {type: Boolean, required: true}
            }]
            }]
});

module.exports = mongoose.model('Dishes', dishSchema);