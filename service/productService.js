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
            logger.debug(`Adding content item: `, productItemData);
            new Product(productItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
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
            const {type, styles, content, tags} = productItemData;
            console.log(productItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(productItemData, null, 2)} `);
    
                ProductItem.findByIdAndUpdate(id, {type, styles, content, tags}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = productService;