const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Storage = require('./storage');
const Sequelize = require('sequelize');
const productSchema = new Schema(
    {
        name: {type: String, required: true, unique: false},
        description: {type: String, default: ""},
        image: {type: String, default: ""},
        nettoPrice: {type: String,  required: true },
        unit: {type: String, required: true},
        weight: {type: String, required: true},
        vat: {type: Number, required: true},
        bruttoPrice: {type: String, required: true},
        productDate: {type: String,required: true},
        supplier: {type: String,required: true},
        lossesPriceNetto: {type: String,required: false},
        losses: {type: String,required: false},
        history: {type: Object, required: true},
        recipe: {type: Object, required: false},
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

productSchema.pre('remove', function (next) {
    const productItem = this;

    Storage.updateMany({}, {$pullAll: {products: [productItem._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

productSchema.pre('findByIdAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('Product', productSchema);
