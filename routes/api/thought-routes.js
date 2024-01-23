const router = require('express').Router();

//inport functions from controller module 
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought, 
    deleteThought
} = require('../../controllers/thoughtController')

// Defining routes 

// all thoughts 
router
    .route('/')
    .get(getThoughts)
    .post(createNewThought);

// single thought 
router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
