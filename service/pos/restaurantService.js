const Restaurant = require("../../model/pos/restaurant");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');

const restaurantService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Restaurant.find()
                .populate({
                    path: 'storages',
                    model: 'Storage',
                    populate: {
                        path: 'products',
                        model: 'Product'
                    }
                })
                .populate({
                    path: 'employees',
                    model: 'Employee'
                })
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Restaurant.findById(id)
                .populate({
                    path: 'storages',
                    model: 'Storage',
                    populate: {
                        path: 'products',
                        model: 'Product'
                    }
                })
                .populate({
                    path: 'employees',
                    model: 'Employee'
                })
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (restaurantData) => {
        return new Promise((resolve, reject) => {
            new Restaurant(restaurantData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (restaurantId) => {
        return new Promise((resolve, reject) => {
            Restaurant.deleteOne({_id: restaurantId})
                .then(resolve)
                .catch(err => reject(err));
        });
    },
    
    update: (id, restaurantData) => {
        const {name,
            description,
            label,
            logo,
            images_top,
            active,
            storages,
            employees } = restaurantData;
        return new Promise((resolve, reject) => {
            logger.debug(`Restaurant section ${id} with data: `, restaurantData);
            Restaurant.findByIdAndUpdate(id, {name,
                description,
                label,
                logo,
                images_top,
                active,
                storages,
                employees})
                .then(resolve)
                .catch(err => reject(err));
        });
    }
};

module.exports = restaurantService;