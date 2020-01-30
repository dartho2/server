const Worker = require("../model/worker");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const workerService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Worker.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (workerItemData) => {
        return new Promise((resolve, reject) => {
            new Worker(workerItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Worker.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (workerItemId) => {
            return new Promise((resolve, reject) => {
                Worker.findOne({_id: workerItemId})
                    .then(workerItem => {
                        if (workerItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(workerItem, null, 2)}`);
                            return workerItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, workerItemData) => {
            const {name} = workerItemData;
            console.log(workerItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(workerItemData, null, 2)} `);
    
                Worker.findByIdAndUpdate(id, {name}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = workerService;