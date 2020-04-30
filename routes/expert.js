const express = require('express');
const router = express.Router();
const expertService = require("../service/expertService.js");


// routes
router.get('/', (req, res, next) => {
    expertService.getAll()
        .then(expert => res.json(expert))
        .catch(err => next(err));
});


router.get('/:id',(req, res, next) => {
    const id = req.params.id;
    expertService.get(id)
        .then(contentExpert => res.json(contentExpert))
        .catch(err => next(err));
});


module.exports = router;