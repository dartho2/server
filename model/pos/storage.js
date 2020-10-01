const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = require('./restaurant');

const storageSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        label: {type: String, required: false},
        active: {type: Boolean, default: true},
        products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
        dishes: [{type: Schema.Types.ObjectId, ref: 'Dish'}]
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

storageSchema.pre('remove', function (next) {
    const storage = this;

    Restaurant.updateMany({}, {$pullAll: {storages: [storage._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

module.exports = mongoose.model('Storage', storageSchema);