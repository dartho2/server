const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const productService = require("../service/productService.js");

// add
router.post('/', authMid, (req, res, next) => {
    const productData = req.body;

    productService.add(productData)
        .then(product => res.status(201).json(product))
        .catch(err => next(err));
});
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const productItemData = req.body;

    productService.update(id, productItemData)
        .then(product => res.json('Content item updated'))
        .catch(err => next(err));
});

// list
router.get('/', authMid, (req, res, next) => {
    productService.getAll()
        .then(product => res.json(product))
        .catch(err => next(err));
});
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    productService.get(id)
        .then(contentProduct => res.json(contentProduct))
        .catch(err => next(err));
});


module.exports = router;