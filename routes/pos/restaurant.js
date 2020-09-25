const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const restaurantService = require("../../service/pos/restaurantService");
const logger = require('../../libs/logger');
const {getTime} = require('../../utils');
const conf = require('../../configuration/configuration');
const cache = {
    cached_at: 0,
    data: null
};

// reset cache
router.get('/reset_cache', authMid, (req, res) => {
    cache.cached_at = 0;
    cache.data = null;
    res.send('');
});

// list
router.get('/', (req, res, next) => {
    if (!cache.data || cache.cached_at + conf.restaurant_cache_timeout <= getTime()) {
        restaurantService.getAll()
            .then(restaurant => {
                cache.data = restaurant;
                cache.cached_at = getTime();
                res.json(restaurant)
            })
            .catch(err => next(err));
    } else {
        logger.debug('Returning cached restaurant');
        res.json(cache.data);
    }
});

// get one
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    restaurantService.get(id)
        .then(restaurant => res.json(restaurant))
        .catch(err => next(err));
});

// add
router.post('/', authMid, (req, res, next) => {
    const restaurantData = req.body;

    restaurantService.add(restaurantData)
        .then(restaurant => res.status(201).json(restaurant))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authMid, (req, res, next) => {
    const id = req.params.id;

    restaurantService.remove(id)
        .then(restaurant => res.json('Restaurant deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authMid, (req, res, next) => {
    const id = req.params.id;
    const restaurantData = req.body;

    restaurantService.update(id, restaurantData)
        .then(restaurant => res.json('Restaurant updated'))
        .catch(err => next(err));
});

module.exports = router;