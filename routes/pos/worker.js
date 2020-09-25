const getUniqueElements = require('../../utils').getUniqueElements;
const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const workerService = require("../../service/pos/workerService");

// add
router.post('/', authMid, (req, res, next) => {
    const workerData = req.body;

    workerService.add(workerData)
        .then(workerData => res.status(201).json(workerData))
        .catch(err => next(err));
});

// list
router.get('/', (req, res, next) => {
    workerService.getAll()
        .then(workerData => res.json(workerData))
        .catch(err => next(err));
});


// get one
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    workerService.get(id)
        .then(workerData => res.json(workerData))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authMid, (req, res, next) => {
    const id = req.params.id;

    workerService.remove(id)
        .then(worker => res.json('Worker item deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const workerData = req.body;

    workerService.update(id, workerData)
        .then(worker => res.json('Worker item updated'))
        .catch(err => next(err));
});

module.exports = router;