const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const storageService = require("../../service/pos/storageService");

// add
router.post('/', authMid, (req, res, next) => {
    const storageData = req.body;

    storageService.add(storageData)
        .then(storage => res.status(201).json(storage))
        .catch(err => next(err));
});

// list
router.get('/', (req, res, next) => {
    storageService.getAll()
        .then(storage => res.json(storage))
        .catch(err => next(err));
});

// get one
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    storageService.get(id)
        .then(storage => res.json(storage))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authMid, (req, res, next) => {
    const storageId = req.params.id;

    storageService.remove(storageId)
        .then(() => res.json('Storage deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const storageData = req.body;

    storageService.update(id, storageData)
        .then(() => res.json('Storage updated'))
        .catch(err => next(err));
});

module.exports = router;