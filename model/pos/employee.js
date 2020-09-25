const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = require('./restaurant');

const restaurantSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        value: {type: String, required: false},
        label: {type: String, required: false},
        price: {type: String, required: false},
        active: {type: Boolean, default: true},
        workers: [{type: Schema.Types.ObjectId, ref: 'Worker'}]
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

restaurantSchema.pre('remove', function (next) {
    const employee = this;

    Restaurant.updateMany({}, {$pullAll: {employees: [employee._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

module.exports = mongoose.model('Employee', restaurantSchema);