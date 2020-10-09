const RecipeItem = require("../../model/pos/recipeItems");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');
const recipeItemsService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            RecipeItem.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            RecipeItem.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (recipeData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding Recipe item: `, recipeData);
            new RecipeItem(recipeData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (recipeId) => {
        return new Promise((resolve, reject) => {
            RecipeItem.findOne({_id: recipeId})
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
        const {name,description, image, nettoPrice, unit, weight, lossesPriceNetto, losses, products, productDate ,vat , history, bruttoPrice, qty, supplier} = recipeData;
      return new Promise((resolve, reject) => {
            logger.debug(`Updating Recipe item ${id} with:\n ${JSON.stringify(recipeData, null, 2)} `);
            RecipeItem.findByIdAndUpdate(id, {name,description, image, nettoPrice, unit, weight, lossesPriceNetto, losses, productDate ,vat , products, history, bruttoPrice, qty, supplier}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

};

module.exports = recipeItemsService;