const Recipe = require("../../model/pos/recipe");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');
const recipeService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Recipe.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Recipe.findById(id)
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

    remove: (recipeId) => {
        return new Promise((resolve, reject) => {
            Recipe.findOne({_id: recipeId})
                .then(recipeData => {
                    if (recipeData) {
                        logger.debug(`Removing content item \n ${JSON.stringify(recipeData, null, 2)}`);
                        return recipeData.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, recipeData) => {
        const {name,label, active,products,recipesitems} = recipeData;
        
        return new Promise((resolve, reject) => {
            logger.debug(`Updating Recipe item ${id} with:\n ${JSON.stringify(recipeData, null, 2)} `);
            Recipe.findByIdAndUpdate(id, {name,label, active,products,recipesitems}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

};

module.exports = recipeService;