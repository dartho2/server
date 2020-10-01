const Dish = require("../../model/pos/dish");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');
const dishService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Dish.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Dish.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (dishData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding Dish item: `, dishData);
            new Product(dishData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (dishId) => {
        return new Promise((resolve, reject) => {
            Dish.findOne({_id: dishId})
                .then(dishData => {
                    if (dishData) {
                        logger.debug(`Removing dish item \n ${JSON.stringify(dishData, null, 2)}`);
                        return dishData.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, dishData) => {
        const {name, foodCost, description, image, category, categoryRes, fC, productMarginFC, vat, bruttoPrice, coating , products, productMargin} = productData;
      

        return new Promise((resolve, reject) => {
            logger.debug(`Updating Dish item ${id} with:\n ${JSON.stringify(dishData, null, 2)} `);

            Dish.findByIdAndUpdate(id, {name, foodCost, description, image, category, categoryRes, fC, productMarginFC, vat, bruttoPrice, coating , products, productMargin}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

};

module.exports = dishService;