const getUniqueElements = require('../../utils').getUniqueElements;
const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const workerService = require("../../service/pos/workerService");
const authorize = require('_helpers/authorize')
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const workerData = req.body;

    workerService.add(workerData)
        .then(workerData => res.status(201).json(workerData))
        .catch(err => next(err));
});

// list
router.get('/', authorize(),(req, res, next) => {
    workerService.getAll()
        .then(workerData => res.json(workerData))
        .catch(err => next(err));
});


// get one
router.get('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;

    workerService.get(id)
        .then(workerData => res.json(workerData))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    workerService.remove(id)
        .then(worker => res.json('Worker item deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const workerData = req.body;

    workerService.update(id, workerData)
        .then(worker => res.json('Worker item updated'))
        .catch(err => next(err));
});

module.exports = router;