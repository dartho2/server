const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const logger = require('../libs/logger');
const {getTime} = require('../utils');
const conf = require('../configuration/configuration');
const request = require('request');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const cache = {
    cached_at: 0,
    data: null
};

// reset cache
router.get('/reset_cache', authorize(Role.Admin), (req, res) => {
    cache.cached_at = 0;
    cache.data = null;
    res.send('');
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    request.get("https://www.sofascore.com/event/" +id+ "/json?",   
    (err, response, body) => {
        if (err) {
            next(err);
        } else if (response.statusCode === 200) {
            res.status(200).json(JSON.parse(body))
       }})
});


module.exports = router;