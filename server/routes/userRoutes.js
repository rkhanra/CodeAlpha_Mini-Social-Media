const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// MY PROFILE

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    const postsCount = await Post.countDocuments({ user: req.user });

    res.json({ user, postsCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed" });
  }
});

// GET USER PROFILE

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    const isFollowing = user.followers.some((id) => id.toString() === req.user);

    res.json({
      user,
      posts,
      postsCount: posts.length,
      isFollowing,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Profile failed" });
  }
});

// FOLLOW / UNFOLLOW

router.post("/:id/follow", auth, async (req, res) => {
  try {
    const me = await User.findById(req.user);
    const target = await User.findById(req.params.id);

    if (!me || !target) {
      return res.status(404).json({ error: "User not found" });
    }

    const already = me.following.some((id) => id.toString() === req.params.id);

    if (already) {
      me.following = me.following.filter(
        (id) => id.toString() !== req.params.id,
      );

      target.followers = target.followers.filter(
        (id) => id.toString() !== req.user,
      );
    } else {
      me.following.push(target._id);
      target.followers.push(me._id);
    }

    await me.save();
    await target.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Follow failed" });
  }
});

// CHANGE PASSWORD

router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "All fields required",
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Current password incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      msg: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Password update failed",
    });
  }
});

module.exports = router;
