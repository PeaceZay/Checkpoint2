const express = require("express");
let router = new express.router();
let djController = require("../controllers/djCTRL");

// get summary of DJ's
router.get("/djs", djController.djSummary)

// get details of a single DJ given the id
router.get("/djs/:id", djController.djDetails)

// create a new DJ
router.post("/djs/", djController.createDj)

// update a DJ, given its id
router.put("/djs/:id", djController.updateDj)

// delete a DJ
router.delete("/djs/:id", djController.deleteDj)



module.exports = router;