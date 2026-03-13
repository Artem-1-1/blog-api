import { Router } from "express";
import * as posts from "../controllers/posts.js"

const router = Router();

router.get("/", posts.getAllPosts);

router.get("/:id", posts.getPostById);

router.post("/new", posts.createPost);

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `UPDATE blog article with id ${id}`});
})

router.delete("/:id", posts.deletePostById);

export default router;