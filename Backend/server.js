import express from "express";
import author from "./routes/author.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

app.use("/articles", author);

app.listen(3000, console.log("Start server on Port 3000"));

export default app;