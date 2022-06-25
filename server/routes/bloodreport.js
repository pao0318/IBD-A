const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");


// ROUTE 1 : Add a new review: Login required
router.post("/getbloodreport/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const mentor = await User.findById(id);
    const user = await User.findById(req.user.id);
    const { images } = req.body;
    const reviewobject = {
      blood : images.img1,
      colonoscopy:images.img2,
  
    };
    await mentor.reviews.push(reviewobject);
    const savedimages = await mentor.save();
    res.json(savedimages);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

module.exports = router;
