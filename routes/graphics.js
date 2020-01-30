const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const graphicService = require("../service/graphicService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), (req, res, next) => {
    graphicService.getAll()
        .then(graphic => res.json(graphic))
        .catch(err => next(err));
});
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const graphicData = req.body;

    graphicService.add(graphicData)
        .then(graphic => res.status(201).json(graphic))
        .catch(err => next(err));
});
router.post('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;
    const graphicItemData = req.body;

    graphicService.update(id, graphicItemData)
        .then(graphic => res.json('Content item updated'))
        .catch(err => next(err));
});
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    graphicService.remove(id)
        .then(graphic => res.json('Content item deleted'))
        .catch(err => next(err));
});

router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;
    graphicService.get(id)
        .then(graphicDish => res.json(graphicDish))
        .catch(err => next(err));
});


module.exports = router;