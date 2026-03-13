import { Router } from "express";
import * as posts from "../controllers/posts.js"

const router = Router();

router.get("/", posts.getAllPosts);

router.get("/:id", posts.getPostById);

router.post("/new", posts.createPost);

router.patch("/:id", posts.updatePostById);

router.delete("/:id", posts.deletePostById);

export default router;