const Expert = require("../model/expert");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const expertService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Expert.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
   
    get: (id) => {
        return new Promise((resolve, reject) => {
            Expert.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    }
    };

module.exports = expertService;