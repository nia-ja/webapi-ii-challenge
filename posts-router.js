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
        if (post.length) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        } else {
            res.status(201).json({ ...post, ...req.body });
        }

    } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const numberOfRecords = await Posts.remove(req.params.id);
        if(numberOfRecords > 0) {
            res.status(200).json({ message: 'The post has been deleted' });
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }

    } catch (error) {
        res.status(500).json({ error: "The post could not be removed" });
    }
})

// PUT
router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const post = await Posts.update(req.params.id, req.body);
        if(!req.body.title || !req.body.contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        } else if (post) {
            res.status(200).json({ "id": req.params.id, ...req.body});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        res.status(500).json({ error: "The post information could not be modified." });
    }
})

module.exports = router;