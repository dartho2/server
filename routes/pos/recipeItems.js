const getUniqueElements = require('../../utils').getUniqueElements;
const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const recipeService = require("../../service/pos/recipeItemsService");
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
// add
router.post('/', authorize(), (req, res, next) => {
    const productData = req.body;

    recipeService.add(productData)
        .then(productData => res.status(201).json(productData))
        .catch(err => next(err));
});

// list
router.get('/',authorize(), (req, res, next) => {
    recipeService.getAll()
        .then(productData => res.json(productData))
        .catch(err => next(err));
});


// get one
router.get('/:id',authorize(), (req, res, next) => {
    const id = req.params.id;

    recipeService.get(id)
        .then(productData => res.json(productData))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    recipeService.remove(id)
        .then(product => res.json('Recipe item deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const productData = req.body;

    recipeService.update(id, productData)
        .then(product => res.json('Recipe item updated'))
        .catch(err => next(err));
});

module.exports = router;
