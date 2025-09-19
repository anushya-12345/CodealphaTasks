import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Create post
router.post("/", async (req, res) => {
  const post = await Post.create({ text: req.body.text, author: req.body.userId });
  res.json(post);
});

// Get posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "name");
  res.json(posts);
});

// Like post
router.post("/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.userId)) {
    post.likes.push(req.body.userId);
    await post.save();
  }
  res.json(post);
});

// Add comment
router.post("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ text: req.body.text, user: req.body.userId });
  await post.save();
  res.json(post);
});

export default router;
