const Graphic = require("../model/graphic");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const graphicService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Graphic.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (graphicItemData) => {
        return new Promise((resolve, reject) => {
            new Graphic(graphicItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Graphic.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (graphicItemId) => {
            return new Promise((resolve, reject) => {
                Graphic.findOne({_id: graphicItemId})
                    .then(graphicItem => {
                        if (graphicItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(graphicItem, null, 2)}`);
                            return graphicItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, graphicItemData) => {
            const {date,items} = graphicItemData;
            console.log(graphicItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(graphicItemData, null, 2)} `);
    
                Graphic.findByIdAndUpdate(id, {date,items}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = graphicService;