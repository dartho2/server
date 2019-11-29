const Carnet = require("../model/carnet");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const carnetService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Carnet.find()
                .populate('data')
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    
    add: (carnetData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding carnet item: `, carnetData);
            new Carnet(carnetData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
};

module.exports = carnetService;