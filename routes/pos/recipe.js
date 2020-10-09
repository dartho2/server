const express = require('express');
const router = express.Router();
const authMid = require('../../middleware/authorization');
const recipeService = require("../../service/pos/recipeService");
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// add
router.post('/', authorize(Role.Admin) , (req, res, next) => {
    const recipeData = req.body;

    recipeService.add(recipeData)
        .then(recipe => res.status(201).json(recipe))
        .catch(err => next(err));
});

// list
router.get('/',authorize(), (req, res, next) => {
    recipeService.getAll()
        .then(recipe => res.json(recipe))
        .catch(err => next(err));
});

// get one
router.get('/:id', authorize(),(req, res, next) => {
    const id = req.params.id;

    recipeService.get(id)
        .then(recipe => res.json(recipe))
        .catch(err => next(err));
});

// delete
router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const recipeId = req.params.id;

    recipeService.remove(recipeId)
        .then(() => res.json('Recipe deleted'))
        .catch(err => next(err));
});

// update
router.post('/:id', authorize(Role.Admin), (req, res, next) => {
    const id = req.params.id;
    const recipeData = req.body;

    recipeService.update(id, recipeData)
        .then(() => res.json('Recipe updated'))
        .catch(err => next(err));
});

module.exports = router;