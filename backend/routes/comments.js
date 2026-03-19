import { Router } from "express"
import * as comment from "../controllers/comments.js";
import { requireAuth, authorize } from "../middleware/requireAuth.js"

const router = Router();

router.use(requireAuth)

router.post("/", authorize("USER"), comment.createComment);

router.patch("/:id", authorize("USER"), comment.editComment);

router.delete("/:id", authorize("USER"), comment.deleteComment);

export default router;