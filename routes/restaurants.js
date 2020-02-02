const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const resService = require("../service/restaurantService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), (req, res, next) => {
    resService.getAll()
        .then(rest => res.json(rest))
        .catch(err => next(err));
});
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const restData = req.body;

    resService.add(restData)
        .then(rest => res.status(201).json(rest))
        .catch(err => next(err));
});
router.post('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;
    const restItemData = req.body;

    resService.update(id, restItemData)
        .then(rest => res.json('Content item updated'))
        .catch(err => next(err));
});



router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    resService.remove(id)
        .then(rest => res.json('Content item deleted'))
        .catch(err => next(err));
});


router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;
    resService.get(id)
        .then(contentRest => res.json(contentRest))
        .catch(err => next(err));
});


module.exports = router;