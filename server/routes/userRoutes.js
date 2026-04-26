const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Follow user
router.post('/:id/follow', async (req, res) => {
  const user = await User.findById(req.params.id);
  const target = await User.findById(req.body.targetId);

  user.following.push(target._id);
  target.followers.push(user._id);

  await user.save();
  await target.save();

  res.json({ msg: "Followed" });
});

module.exports = router;