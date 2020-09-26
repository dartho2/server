const Restaurant = require("../../model/pos/restaurant");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');

const restaurantService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Restaurant.find()
            .populate({
                path: 'storages',
                model: 'Storage'
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
                model: 'Storage'
            })
            .populate({
                path: 'employees',
                model: 'Employee'
            })
                .then(resolve)
                .catch(err => reject(err))
        });
    },

   
    add: (resData) => {
        return new Promise((resolve, reject) => {
            new Restaurant(resData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (resId) => {
        return new Promise((resolve, reject) => {
            Restaurant.findOne({_id: resId})
                .then(res=>{
                    if(res){
                        return res.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, resData) => {
        const {name,description,label, logo, images_top, active, storages, employees} = resData;
        return new Promise((resolve, reject) => {
            logger.debug(`Updating storage ${id} with: styles: \n`, JSON.stringify(resData, null, 3));
            Restaurant.findByIdAndUpdate(id, {name,description,label, logo, images_top, active, storages, employees})
                .then(resolve)
                .catch(err => err);
        });
    }
};

module.exports = restaurantService;