const router = require('express').Router();

//inport functions from controller module 
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought, 
    deleteThought,
    addReaction, 
    removeReaction
} = require('../../controllers/thoughtController')

// Defining routes 

// all thoughts 
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// single thought 
router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// add reaction 
router
    .route('/:thoughtID/reactions')
    .post(addReaction);

// delete reaction
router
    .route('/:thoughtID/reactions/:reactionID')
    .delete(removeReaction);


modules.exports = router;

