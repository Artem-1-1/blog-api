import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "GET all blog articles"});
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `GET blog article with id ${id}`});
})

router.post("/", (req, res) => {
  res.json({ message: "POST a new blog article"});
})

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `UPDATE blog article with id ${id}`});
})


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `DELETE blog article with id ${id}`});
})

export default router;