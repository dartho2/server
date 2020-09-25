const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
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