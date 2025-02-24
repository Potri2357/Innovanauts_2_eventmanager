const express = require("express");
const { checkAvailability, bookEvent } = require("../controllers/eventController");

const router = express.Router();

router.post("/check", checkAvailability);
router.post("/book", bookEvent);

module.exports = router;
