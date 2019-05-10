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

// GET post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        console.log(post);
        if (post.length) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
})

// POST

// DELETE

// PUT



module.exports = router;