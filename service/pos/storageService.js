const Storage = require("../../model/pos/storage");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');

const storageService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Storage.find()
                .populate('product')
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Storage.findById(id)
                .populate({
                    path: 'product',
                    model: 'ProductItem'
                })
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (storageData) => {
        return new Promise((resolve, reject) => {
            new Section(storageData).save()
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
        const {name} = storageData;
        return new Promise((resolve, reject) => {
            logger.debug(`Updating storage ${id} with: styles: \n`, JSON.stringify(storageData, null, 3));
            Storage.findByIdAndUpdate(id, {name})
                .then(resolve)
                .catch(err => err);
        });
    }
};

module.exports = storageService;