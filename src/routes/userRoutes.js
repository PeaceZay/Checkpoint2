const express = require("express");
let router = new express.router();
let userController = require("../controllers/userCTRL");

// get summary of users
router.get("/users", userController.userSummary)


// get details of a single user given the id
router.get("/users/:id", userController.userDetails)


// create a new user
router.post("/user/", userController.createUser)


// update a user, given its id
router.put("/user/:id", userController.updateUser)


// delete a user
router.delete("/user/:id", userController.deleteUser)

// export the routes!!!!
module.exports = router;