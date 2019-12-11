const Analystic = require("../model/analystic");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const analysticService = {
    get: (id) => {
        return new Promise((resolve, reject) => {
                Analystic.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    };

module.exports = analysticService;