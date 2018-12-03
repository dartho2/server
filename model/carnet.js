const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carnetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    type: {
        type: Object,
        required: true,
        name: {
            type: Object,
            enum: ['pdtr', 'joga', '7mepoty', 'consulting'],
            required: true
        },
        options: {
                type: String,
                enum: ['karnet ilościowy', 'pakiet', 'karnet open', 'pakiet solarium'],
                required: true
            },
        package: {
            type: Object, default: {},
                name: {
                    type: String,
                    required: true
                },
                time: {
                    type: String,
                    required: true
                },
                amount: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }
            },
            sdata: {
                type: String,
                required: true
            },
            edata: {
                type: String,
                required: true
            },
        }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Carnets', carnetSchema);