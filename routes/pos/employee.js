const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const employeeService = require("../../service/pos/employeeService");
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const employeeData = req.body;

    employeeService.add(employeeData)
        .then(employee => res.status(201).json(employee))
        .catch(err => next(err));
});

// list
router.get('/', authorize(),(req, res, next) => {
    employeeService.getAll()
        .then(employee => res.json(employee))
        .catch(err => next(err));
});

// get one
router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;

    employeeService.get(id)
        .then(employee => res.json(employee))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const employeeId = req.params.id;

    employeeService.remove(employeeId)
        .then(() => res.json('Employee deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const employeeData = req.body;

    employeeService.update(id, employeeData)
        .then(() => res.json('Employee updated'))
        .catch(err => next(err));
});

module.exports = router;