const ResItem = require("../model/resItem");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const resItemService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            ResItem.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (resItemData) => {
        return new Promise((resolve, reject) => {
            new ResItem(resItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            ResItem.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (resItemId) => {
            return new Promise((resolve, reject) => {
                ResItem.findOne({_id: resItemId})
                    .then(resItem => {
                        if (resItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(resItem, null, 2)}`);
                            return resItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, resItemData) => {
            const {name, value} = dishItemData;
            console.log(resItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(resItemData, null, 2)} `);
    
                ResItem.findByIdAndUpdate(id, {name, value})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = resItemService;