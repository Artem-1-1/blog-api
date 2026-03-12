import express from "express";
import author from "./routes/author.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

app.use("/api/posts", author);

app.listen(3000, console.log("Start server on Port 3000"));

export default app;