const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recipe = require('./recipe');

const recipeitemsschema = new Schema(
    {
        name: {type: String, required: true, unique: false},
        description: {type: String, default: ""},
        image: {type: String, default: ""},
        nettoPrice: {type: String,  required: true },
        unit: {type: String, required: true},
        weight: {type: String, required: true},
        vat: {type: Number, required: true},
        bruttoPrice: {type: String, required: true},
        productDate: {type: String,required: false},
        supplier: {type: String,required: false},
        lossesPriceNetto: {type: String,required: false},
        losses: {type: String,required: false},
        history: {type: Object, required: false},
        products: {type: Object, required: true}
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

recipeitemsschema.pre('remove', function (next) {
    const productItem = this;

    Recipe.updateMany({}, {$pullAll: {recipeitems: [productItem._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

recipeitemsschema.pre('findByIdAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('Recipeitem', recipeitemsschema);
