const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

//  CREATE POST

router.post("/", auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const post = await Post.create({
      user: req.user,
      content,
      likes: [],
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Post creation failed" });
  }
});

// GET POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// LIKE POST
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const userId = req.user.toString();

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user);
    }

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Like failed" });
  }
});

// COMMENT

router.post("/:id/comment", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      post: req.params.id,
      user: req.user,
      text,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Comment failed" });
  }
});

// GET COMMENTS

router.get("/:id/comments", async (req, res) => {
  const comments = await Comment.find({ post: req.params.id }).populate(
    "user",
    "username",
  );

  res.json(comments);
});

module.exports = router;
