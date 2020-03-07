const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const betService  = require("../service/betService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), (req, res, next) => {
    betService.getAll()
        .then(dish => res.json(dish))
        .catch(err => next(err));
});
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const dishData = req.body;

    betService.add(dishData)
        .then(dish => res.status(201).json(dish))
        .catch(err => next(err));
});
router.post('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;
    const dishItemData = req.body;

    betService.update(id, dishItemData)
        .then(dish => res.json('Content item updated'))
        .catch(err => next(err));
});
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    betService.remove(id)
        .then(dish => res.json('Content item deleted'))
        .catch(err => next(err));
});

router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;
    betService.get(id)
        .then(contentDish => res.json(contentDish))
        .catch(err => next(err));
});


module.exports = router;