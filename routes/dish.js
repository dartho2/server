const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const dishService = require("../service/dishService.js");

// add
router.post('/', authMid, (req, res, next) => {
    const dishData = req.body;

    dishService.add(dishData)
        .then(dish => res.status(201).json(dish))
        .catch(err => next(err));
});
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const dishItemData = req.body;

    dishService.update(id, dishItemData)
        .then(dish => res.json('Content item updated'))
        .catch(err => next(err));
});

// list
router.get('/', authMid, (req, res, next) => {
    dishService.getAll()
        .then(dish => res.json(dish))
        .catch(err => next(err));
});
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    dishService.get(id)
        .then(contentDish => res.json(contentDish))
        .catch(err => next(err));
});


module.exports = router;