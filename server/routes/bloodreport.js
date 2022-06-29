const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const env = require("dotenv/config");
const User = require("../models/User");
const Bloodreport = require("../models/BloodReport")


// ROUTE 1 : Add a blood report
router.post("/addbloodreport/:id", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { images } = req.body.img;
    const event = new Bloodreport({
      id:req.user.id,
      img:images,
    })
    const savedEvent = await event.save();
    res.json(savedEvent)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// Fetch blood report images

router.get("/fetchbloodreport:id", fetchUser, async (req, res) => {
  try {
    const events = await Bloodreport.find({ id: req.user.id })
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

module.exports = router;
