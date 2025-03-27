const express = require("express");
const Travel = require("./travel.model");
const { postATravel, getAllTravels, getSingleTravel, updateTravel, deleteATravel } = require("./travel.controller.js");
const verifyAdminToken = require("../middleware/verifyAdminToken.js");
const router = express.Router();

// post a travel
router.post("/create-travel", verifyAdminToken, postATravel)

// get all travels
router.get("/", getAllTravels)

// get a single travel
router.get("/:id", getSingleTravel)

// update a book
router.put("/edit/:id", verifyAdminToken, updateTravel)

// delete a book
router.delete("/:id", verifyAdminToken, deleteATravel)

module.exports = router;