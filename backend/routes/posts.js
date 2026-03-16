import { Router } from "express";
import * as posts from "../controllers/posts.js"
import { requireAuth, authorize } from "../middleware/requireAuth.js"

const router = Router();

router.use(requireAuth)

router.get("/", posts.getAllPosts);

router.get("/:id", posts.getPostById);

router.post("/new", authorize('AUTHOR'), posts.createPost);

router.patch("/:id", authorize('AUTHOR'), posts.updatePostById);

router.delete("/:id", authorize('AUTHOR'), posts.deletePostById);

export default router;