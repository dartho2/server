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

router.get('/:turn/:ses', (req, res, next) => {
    const turnament = req.params.turn;
	 const season = req.params.ses;
    request.get("http://www.sofascore.com/tournament/" + turnament +"/" +season +"/standings/tables/json",   
    (err, response, body) => {
        if (err) {
            next(err);
        } else if (response.statusCode === 200) {
            res.status(200).json(JSON.parse(body))
       }})
});


module.exports = router;
