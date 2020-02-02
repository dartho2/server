const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const restaurantItemsService = require("../service/restaurantItemsService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), (req, res, next) => {
    restaurantItemsService.getAll()
        .then(items => res.json(items))
        .catch(err => next(err));
});
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const itemsData = req.body;

    restaurantItemsService.add(itemsData)
        .then(items => res.status(201).json(items))
        .catch(err => next(err));
});
router.post('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;
    const itemstemData = req.body;

    restaurantItemsService.update(id, itemsItemData)
        .then(items => res.json('Content item updated'))
        .catch(err => next(err));
});
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    restaurantItemsService.remove(id)
        .then(items => res.json('Content item deleted'))
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
    restaurantItemsService.get(id)
        .then(contentItems => res.json(contentItems))
        .catch(err => next(err));
});


module.exports = router;