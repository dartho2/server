const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const carnetService = require("../service/carnetService");

// add
router.post('/', authMid, (req, res, next) => {
    const carnetData = req.body;

    carnetService.add(carnetData)
        .then(carnet => res.status(201).json(carnet))
        .catch(err => next(err));
});

// list
router.get('/', authMid, (req, res, next) => {
    carnetService.getAll()
        .then(carnet => res.json(carnet))
        .catch(err => next(err));
});


module.exports = router;