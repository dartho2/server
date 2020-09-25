const Employee = require("../../model/pos/employee.js");
const resolveErrorType = require('../../error').resolveErrorType;
const logger = require('../../libs/logger');

const employeeService = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Employee.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            Employee.findById(id)
                .then(resolve)
                .catch(err => reject(err))
        });
    },

    add: (employeeItemData) => {
        return new Promise((resolve, reject) => {
            logger.debug(`Adding content item: `, employeeItemData);
            new Employee(employeeItemData).save()
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

    remove: (employeeItemId) => {
        return new Promise((resolve, reject) => {
            Employee.findOne({_id: employeeItemId})
                .then(employeeItem => {
                    if (employeeItem) {
                        logger.debug(`Removing Employee item \n ${JSON.stringify(employeeItem, null, 2)}`);
                        return employeeItem.remove();
                    }
                })
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    update: (id, employeeItemData) => {
        const {name, value, price, active } = employeeItemData;
        console.log(employeeItemData);

        return new Promise((resolve, reject) => {
            logger.debug(`Updating employe item ${id} with:\n ${JSON.stringify(employeeItemData, null, 2)} `);

            Employee.findByIdAndUpdate(id, {name, value, price, active}, {runValidators: true})
                .then(resolve)
                .catch(err => reject(resolveErrorType(err)))
        });
    },

   
};

module.exports = employeeService;