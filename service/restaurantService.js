const Rest = require("../model/restaurant");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const resService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Rest.find()
            .populate('itemsres')
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (restItemData) => {
        return new Promise((resolve, reject) => {
            new Rest(restItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Rest.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (restItemId) => {
            return new Promise((resolve, reject) => {
                Rest.findOne({_id: restItemId})
                    .then(restItem => {
                        if (restItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(restItem, null, 2)}`);
                            return restItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, restItemData) => {
            const {itemsRes} = restItemData;
            console.log(restItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(restItemData, null, 2)} `);
    
                Rest.findByIdAndUpdate(id, {itemsRes})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = resService;