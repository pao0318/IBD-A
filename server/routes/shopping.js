const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("2643c59d908561f9a329099b6663dcc1c19adec112c6c76d61c106387651b15c");

//
router.post("/shopmedicine", fetchUser, async (req, res) => {
    try {
        const { query } = req.body;
        const params = {
          q: query,
          tbm: "shop",
          location: "India",
          hl: "en",
          gl: "us"
        };
        const callback = function(data) {
          res.json(data['shopping_results']);
        };
        search.json(params, callback);
        
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Oops internal server error occured");
    }
  });

  module.exports = router;