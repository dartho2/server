const Dish = require("../model/dish");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const dishService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Dish.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (dishItemData) => {
        return new Promise((resolve, reject) => {
            new Dish(dishItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Dish.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (dishItemId) => {
            return new Promise((resolve, reject) => {
                Dish.findOne({_id: dishItemId})
                    .then(dishItem => {
                        if (dishItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(dishItem, null, 2)}`);
                            return dishItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, dishItemData) => {
            const {name, foodCost, description, category, fC, productMarginFC, vat, bruttoPrice, coating , productMargin} = dishItemData;
            console.log(dishItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(dishItemData, null, 2)} `);
    
                Dish.findByIdAndUpdate(id, {name, foodCost, description, category, fC, productMarginFC,  bruttoPrice, vat, coating, productMargin}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = dishService;