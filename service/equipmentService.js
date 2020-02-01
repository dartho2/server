const Equipment = require("../model/equipment");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const equipmentService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Equipment.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (equipmentItemData) => {
        return new Promise((resolve, reject) => {
            new Equipment(equipmentItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Equipment.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (equipmentItemId) => {
            return new Promise((resolve, reject) => {
                Equipment.findOne({_id: equipmentItemId})
                    .then(equipmentItem => {
                        if (equipmentItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(equipmentItem, null, 2)}`);
                            return equipmentItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, equipmentItemData) => {
            const {name} = equipmentItemData;
            console.log(equipmentItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(equipmentItemData, null, 2)} `);
    
                Equipment.findByIdAndUpdate(id, {name}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = equipmentService;