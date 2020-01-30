const express = require('express');
const router = express.Router();
// const authMid = require('../middleware/authorization');
const workerService = require("../service/workerService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), (req, res, next) => {
    workerService.getAll()
        .then(worker => res.json(worker))
        .catch(err => next(err));
});
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const workerData = req.body;

    workerService.add(workerData)
        .then(worker => res.status(201).json(worker))
        .catch(err => next(err));
});
router.post('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;
    const workerItemData = req.body;

    workerService.update(id, workerItemData)
        .then(worker => res.json('Content item updated'))
        .catch(err => next(err));
});
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    workerService.remove(id)
        .then(worker => res.json('Content item deleted'))
        .catch(err => next(err));
});


// list

// router.get('/', (req, res, next) => {
//     dishService.getAll()
//         .then(dish => res.json(dish))
//         .catch(err => next(err));
// });
router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;
    workerService.get(id)
        .then(contentWorker => res.json(contentWorker))
        .catch(err => next(err));
});


module.exports = router;