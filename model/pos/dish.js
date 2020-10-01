const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Storage = require('./storage');

const dishSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        categoryRes:  {type: String, required: true},
        category:  {type: String, required: true},
        foodCost: {type: String,  required: true },
        fC: {type: String,  required: true },
        vat: {type: String,  required: true },
        productMarginFC: {type: String,  required: true },
        image: {type: String,  required: false },
        bruttoPrice: {type: String,  required: true },
        productMargin: {type: String,  required: true },
        coating: {type: String,  required: true },
        products: {type: Object,  required: true }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

dishSchema.pre('remove', function (next) {
    const dishItem = this;

    Storage.updateMany({}, {$pullAll: {dishes: [dishItem._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

dishSchema.pre('findByIdAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('Dishes', dishSchema);
