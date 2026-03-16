import express from "express";
import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, console.log("Start server on Port 3000"));

export default app;