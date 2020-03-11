const Bet = require("../model/bet");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const betService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Bet.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },
    add: (betItemData) => {
        return new Promise((resolve, reject) => {
            new Bet(betItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            Bet.find({date: id})
                .then(resolve)
                .catch(err => reject(err))
        });
    },
        
        remove: (betItemId) => {
            return new Promise((resolve, reject) => {
                Bet.findOne({_id: betItemId})
                    .then(betItem => {
                        if (betItem) {
                            logger.debug(`Removing content item \n ${JSON.stringify(betItem, null, 2)}`);
                            return betItem.remove();
                        }
                    })
                    .then(resolve)
                    .catch(err => reject(err));
            });
        },
    
        update: (id, betItemData) => {
            const {date, status, rate, statusChanged, events} = betItemData;
            console.log(betItemData);
    
            return new Promise((resolve, reject) => {
                logger.debug(`Updating content item ${id} with:\n ${JSON.stringify(betItemData, null, 2)} `);
    
                Bet.findByIdAndUpdate(id, {date,status,rate, statusChanged,events}, {runValidators: true})
                    .then(resolve)
                    .catch(err => reject(resolveErrorType(err)))
            });
        },
    };

module.exports = betService;