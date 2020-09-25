const Worker = require("../../model/pos/worker");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');
const workerService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Worker.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Worker.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (workerData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding Worker item: `, workerData);
            new Worker(workerData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (workerId) => {
        return new Promise((resolve, reject) => {
            Worker.findOne({_id: workerId})
                .then(workerData => {
                    if (workerData) {
                        logger.debug(`Removing content item \n ${JSON.stringify(workerData, null, 2)}`);
                        return workerData.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, workerData) => {
        const {fname,lname,price,value,contract} = workerData;
      

        return new Promise((resolve, reject) => {
            logger.debug(`Updating Product item ${id} with:\n ${JSON.stringify(workerData, null, 2)} `);

            Worker.findByIdAndUpdate(id, {fname,lname,price,value,contract}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

};

module.exports = workerService;