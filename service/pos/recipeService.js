const Recipe = require("../../model/pos/recipe");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');
const productService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Recipe.find()
            .populate('products')
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Recipe.findById(id)
            .populate({
                path: 'products',
                model: 'Product'
            }) 
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (productData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding Recipe item: `, productData);
            new Recipe(productData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (productId) => {
        return new Promise((resolve, reject) => {
            Recipe.findOne({_id: productId})
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
        const {name,description, image, nettoPrice, unit, weight, lossesPriceNetto, losses, products, productDate ,vat , history, bruttoPrice, qty, supplier} = productData;
        console.log(productData);

        return new Promise((resolve, reject) => {
            logger.debug(`Updating Recipe item ${id} with:\n ${JSON.stringify(productData, null, 2)} `);

            Recipe.findByIdAndUpdate(id, {name,description, image, nettoPrice, unit, weight, lossesPriceNetto, losses, productDate ,vat , products, history, bruttoPrice, qty, supplier}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

};

module.exports = productService;