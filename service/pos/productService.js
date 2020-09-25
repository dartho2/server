const Product = require("../../model/pos/product");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');
const productService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Product.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (productData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding Product item: `, productData);
            new Product(productData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (productId) => {
        return new Promise((resolve, reject) => {
            Product.findOne({_id: productId})
                .then(productData => {
                    if (productData) {
                        logger.debug(`Removing content item \n ${JSON.stringify(productData, null, 2)}`);
                        return productData.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, productData) => {
        const {name,description, image, nettoPrice, unit, weight, lossesPriceNetto, losses, recipe, productDate ,vat , history, bruttoPrice, qty, supplier} = productData;
        console.log(productData);

        return new Promise((resolve, reject) => {
            logger.debug(`Updating Product item ${id} with:\n ${JSON.stringify(productData, null, 2)} `);

            Product.findByIdAndUpdate(id, {name,description, image, nettoPrice, unit, weight, lossesPriceNetto, losses, recipe, productDate ,vat , history, bruttoPrice, qty, supplier}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

};

module.exports = productService;