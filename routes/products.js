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

// list
router.get('/', authMid, (req, res, next) => {
    productService.getAll()
        .then(product => res.json(product))
        .catch(err => next(err));
});


module.exports = router;