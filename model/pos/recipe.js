const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Storage = require('./storage');

const recipeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        label: {type: String, required: false},
        active: {type: Boolean, default: true},
        recipeitems: [{type: Schema.Types.ObjectId, ref: 'Recipeitem'}]
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

recipeSchema.pre('remove', function (next) {
    const recipeItem = this;

    Storage.updateMany({}, {$pullAll: {recipes: [recipeItem._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

recipeSchema.pre('findByIdAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('Recipe', recipeSchema);