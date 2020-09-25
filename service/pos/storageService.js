const Storage = require("../../model/pos/storage.js");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');

const storageService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Storage.find()
                .populate('products')
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Storage.findById(id)
                .populate({
                    path: 'products',
                    model: 'Product'
                })
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (storageData) => {
        return new Promise((resolve, reject) => {
            new Storage(storageData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (storageId) => {
        return new Promise((resolve, reject) => {
            Storage.findOne({_id: storageId})
                .then(storage=>{
                    if(storage){
                        return storage.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, storageData) => {
        const {name,label, active,products} = storageData;
        return new Promise((resolve, reject) => {
            logger.debug(`Updating storage ${id} with: styles: \n`, JSON.stringify(storageData, null, 3));
            Storage.findByIdAndUpdate(id, {name,label, active,products})
                .then(resolve)
                .catch(err => err);
        });
    }
};

module.exports = storageService;