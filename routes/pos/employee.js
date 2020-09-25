const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const employeeService = require("../../service/pos/employeeService");

// add
router.post('/', authMid, (req, res, next) => {
    const employeeData = req.body;

    employeeService.add(employeeData)
        .then(employee => res.status(201).json(employee))
        .catch(err => next(err));
});

// list
router.get('/', (req, res, next) => {
    employeeService.getAll()
        .then(employee => res.json(employee))
        .catch(err => next(err));
});

// get one
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    employeeService.get(id)
        .then(employee => res.json(employee))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authMid, (req, res, next) => {
    const employeeId = req.params.id;

    employeeService.remove(employeeId)
        .then(() => res.json('Employee deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const employeeData = req.body;

    employeeService.update(id, employeeData)
        .then(() => res.json('Employee updated'))
        .catch(err => next(err));
});

module.exports = router;