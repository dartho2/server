const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, default: ""},
        label: {type: String, required: false},
        logo: {type: String, default: null},
        images_top: {type: Array, default: []},
        active: {type: Boolean, default: true},
        storages: [{type: Schema.Types.ObjectId, ref: 'Storage'}]
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);