const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const productService = require("../service/productService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const productData = req.body;

    productService.add(productData)
        .then(product => res.status(201).json(product))
        .catch(err => next(err));
});
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const productItemData = req.body;
    console.log(productItemData)
    productService.update(id, productItemData)
        .then(product => res.json('Content item updated'))
        .catch(err => next(err));
});

// list
router.get('/', authorize(Role.Admin),(req, res, next) => {
    productService.getAll()
        .then(product => res.json(product))
        .catch(err => next(err));
});
router.get('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    productService.get(id)
        .then(contentProduct => res.json(contentProduct))
        .catch(err => next(err));
});
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    productService.remove(id)
        .then(dish => res.json('Content item deleted'))
        .catch(err => next(err));
});


module.exports = router;