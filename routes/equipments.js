const express = require('express');
const router = express.Router();
const equipmnetService = require("../service/equipmentService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), (req, res, next) => {
    equipmentService.getAll()
        .then(equipmnet => res.json(equipmnet))
        .catch(err => next(err));
});
// add
router.post('/', authorize(Role.Admin), (req, res, next) => {
    const equipmnetData = req.body;

    equipmnetService.add(equipmnetData)
        .then(equipmnet => res.status(201).json(equipmnet))
        .catch(err => next(err));
});
router.post('/:id', authorize(), (req, res, next) => {
    const id = req.params.id;
    const equipmnetItemData = req.body;

    equipmnetService.update(id, equipmnetItemData)
        .then(equipmnet => res.json('Content item updated'))
        .catch(err => next(err));
});
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;

    equipmnetService.remove(id)
        .then(equipmnet => res.json('Content item deleted'))
        .catch(err => next(err));
});

router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;
    equipmnetService.get(id)
        .then(contentEquipmnet => res.json(contentEquipmnet))
        .catch(err => next(err));
});


module.exports = router;