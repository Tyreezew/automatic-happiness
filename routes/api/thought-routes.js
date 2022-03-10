const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction

} = require('../../controllers/thought-controller');

router.route('/')
.get(getThoughts)

router.route('/:userId')
.post(addThought)

router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)

router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction)

module.exports = routes;