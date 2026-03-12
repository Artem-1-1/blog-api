import * as postQueries from "../db/post.queries.js";

export const getAllPosts = async (req, res) => {
  const posts = await postQueries.getAllPublishedPosts();

  res.status(200).json(posts)
}

export const getPostById = async(req, res) => {
  const { id } = req.params;
  const post = await postQueries.getPostById(id);

  res.status(200).json(post)
}

export const deletePostById = async(req, res) => {
  const { id } = req.params;
  const post = await postQueries.deletePostById(id);

  res.status(200).json(post)
}