const express = require('express');

const Posts  = require('./data/db.js');

const router = express.Router();

// /api/posts
// GET all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    }
  });



module.exports = router;