const getUniqueElements = require('../../utils').getUniqueElements;
const express = require('express');
const router = express.Router();
const Product = require("../../model/pos/product");
const authMid = require('../../middleware/authorization');
const productService = require("../../service/pos/productService");
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const Op = Sequelize.Op;
// add
router.post('/', authorize(), (req, res, next) => {
    const productData = req.body;

    productService.add(productData)
        .then(productData => res.status(201).json(productData))
        .catch(err => next(err));
});

// list
router.get('/',authorize(), (req, res, next) => {
    productService.getAll()
        .then(productData => res.json(productData))
        .catch(err => next(err));
});

// Seat=rch
router.get('/search',authorize(), (req, res, next) => {
 const { term } = req.query
 Product.find({ 
     name:  { $regex: new RegExp("^" + term.toLowerCase(), "i") }
 }).then(productData => res.json(productData))
 .catch(err => console.log(err))
});

// get one
router.get('/:id',authorize(), (req, res, next) => {
    const id = req.params.id;

    productService.get(id)
        .then(productData => res.json(productData))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    productService.remove(id)
        .then(product => res.json('Product item deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const productData = req.body;

    productService.update(id, productData)
        .then(product => res.json('Product item updated'))
        .catch(err => next(err));
});

module.exports = router;
