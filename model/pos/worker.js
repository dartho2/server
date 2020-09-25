const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employee');

const workerSchema = new Schema(
    {
        fname: {type: String, required: true, unique: false},
        lname: {type: String, required: true, unique: false},
        value: {type: String, required: false, unique: false},
        price: {type: String, required: false, unique: false},
        contract: {type: String, required: false, unique: false},
       
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

workerSchema.pre('remove', function (next) {
    const workerItem = this;

    Employee.updateMany({}, {$pullAll: {workers: [workerItem._id]}})
        .then(() => next())
        .catch(err => console.log(JSON.stringify(err)));
});

workerSchema.pre('findByIdAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('Worker', workerSchema);