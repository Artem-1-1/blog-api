import * as postQueries from "../db/post.queries.js";

export const createPost = async (req, res) => {
  const { title, postContent, isPublished } = req.body;
  // const userId = req.user.id; 

  try {
    const fakeID = "1";
    console.log("Данные получены:", { title, postContent, isPublished, fakeID });
    // const post = await postQueries.createPost(title, postContent, isPublished, userId);
    // res.status(201).json(post);
    res.status(201).json({ 
      message: "Тест пройден, данные получены!", 
      received: { title, postContent, isPublished, fakeID } 
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Post not been created" });
  }
}

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