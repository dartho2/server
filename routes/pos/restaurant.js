const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const restaurantService = require('../../service/pos/restaurantService');
const authorize = require('_helpers/authorize')
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const reData = req.body;

    restaurantService.add(reData)
        .then(resta => res.status(201).json(resta))
        .catch(err => next(err));
});

// list
router.get('/', authorize(), (req, res, next) => {
    restaurantService.getAll()
        .then(resta => res.json(resta))
        .catch(err => next(err));
});

// get one
router.get('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;

    restaurantService.get(id)
        .then(resta => res.json(resta))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const restId = req.params.id;

    restaurantService.remove(restId)
        .then(() => res.json('Restaurant deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const resData = req.body;

    restaurantService.update(id, resData)
        .then(() => res.json('Restaurant updated'))
        .catch(err => next(err));
});

module.exports = router;