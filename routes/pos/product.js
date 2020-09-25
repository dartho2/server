const getUniqueElements = require('../../utils').getUniqueElements;
const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const productService = require("../../service/pos/productService");

// add
router.post('/', authMid, (req, res, next) => {
    const productData = req.body;

    productService.add(productData)
        .then(productData => res.status(201).json(productData))
        .catch(err => next(err));
});

// list
router.get('/', (req, res, next) => {
    productService.getAll()
        .then(productData => res.json(productData))
        .catch(err => next(err));
});


// get one
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    productService.get(id)
        .then(productData => res.json(productData))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authMid, (req, res, next) => {
    const id = req.params.id;

    productService.remove(id)
        .then(product => res.json('Product item deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const productData = req.body;

    productService.update(id, productData)
        .then(product => res.json('Product item updated'))
        .catch(err => next(err));
});

module.exports = router;