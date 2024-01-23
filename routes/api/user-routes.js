// import express router
const router = require('express').Router();

//import functions from controller module
const {
    getUsers, 
    getSingleUser, 
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

//Defining routes

// all users
router
    .route('/')
    .get(getUsers)
    .post(createNewUser);

// single users
router
    .route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// user friends
router
    .route('/:userID/friends/:fiendID')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;