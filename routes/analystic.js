const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const analysticService = require("../service/analysticService");
const logger = require('../libs/logger');
const {getTime} = require('../utils');
const conf = require('../configuration/configuration');
const request = require('request');


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    request.get("https://www.sofascore.com/football//"+id+"/json?",   
    (err, response, body) => {
        if (err) {
            next(err);
        } else if (response.statusCode === 200) {
            res.status(200).json(JSON.parse(body)['sportItem'].tournaments)
       }})
});


module.exports = router;