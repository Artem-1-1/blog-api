import * as postQueries from "../db/post.queries.js";

export const createPost = async (req, res) => {
  const { title, postContent, isPublished } = req.body;
  const userId = req.user.id; 

  try {
    console.log("Данные получены:", { title, postContent, isPublished, userId});
    const post = await postQueries.createPost(title, postContent, isPublished, userId);
    res.status(201).json(post);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Post not been created" });
  }
}

export const getAllPosts = async (req, res) => {
  const posts = await postQueries.getAllPublishedPosts();

  res.status(200).json(posts)
}

export const getAllDraftPostByUserId = async (req, res) => {
  const currentUserId = req.user.id; 
  const posts = await postQueries.getAllDraftPostsById(currentUserId);

  res.status(200).json(posts)
}

export const getPostById = async(req, res) => {
  const { id } = req.params;
  const post = await postQueries.getPostById(id);

  res.status(200).json(post)
}

export const updatePostById = async(req, res) => {
  const { id: postId } = req.params;
  const { title, postContent, isPublished } = req.body;
  const currentUserId = req.user.id;
  
  const updatePost = await postQueries.updatePostById(postId, title, postContent, isPublished, currentUserId);

  res.status(200).json(updatePost);
}

export const deletePostById = async(req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  const post = await postQueries.deletePostById(id, userId);

  res.status(200).json(post)
}