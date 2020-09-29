const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const storageService = require("../../service/pos/storageService");
const authorize = require('_helpers/authorize')
// add
router.post('/', authorize(Role.Admin) , (req, res, next) => {
    const storageData = req.body;

    storageService.add(storageData)
        .then(storage => res.status(201).json(storage))
        .catch(err => next(err));
});

// list
router.get('/',authorize(), (req, res, next) => {
    storageService.getAll()
        .then(storage => res.json(storage))
        .catch(err => next(err));
});

// get one
router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;

    storageService.get(id)
        .then(storage => res.json(storage))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const storageId = req.params.id;

    storageService.remove(storageId)
        .then(() => res.json('Storage deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const storageData = req.body;

    storageService.update(id, storageData)
        .then(() => res.json('Storage updated'))
        .catch(err => next(err));
});

module.exports = router;