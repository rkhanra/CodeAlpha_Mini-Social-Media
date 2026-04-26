const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Create post
router.post('/', async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('user');
  res.json(posts);
});

// Like post
router.post('/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes.push(req.body.userId);
  await post.save();
  res.json(post);
});

// Add comment
router.post('/:id/comment', async (req, res) => {
  const comment = await Comment.create({
    post: req.params.id,
    user: req.body.userId,
    text: req.body.text
  });
  res.json(comment);
});

module.exports = router;