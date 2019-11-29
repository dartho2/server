const Product = require("../model/product");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const productService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Product.find()
                .populate('data')
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    
    add: (productData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding carnet item: `, productData);
            new Product(productData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
};

module.exports = productService;