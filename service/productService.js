const Product = require("../model/product");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const productService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Product.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (productItemData) => {
        return new Promise((resolve, reject) => {
            new Product(productItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (productItemId) => {
            return new Promise((resolve, reject) => {
                Product.findOne({_id: productItemId})
                    .then(productItem => {
                        if (productItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(productItem, null, 2)}`);
                            return productItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, productItemData) => {
            const {name,description, image, label, logo, price, unit, active, style,weight,product_data,vat,history} = productItemData;
            console.log(productItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(productItemData, null, 2)} `);
    
                Product.findByIdAndUpdate(id, {name,description, image, label, logo, price, unit, active, style,weight,product_data,vat,history}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = productService;