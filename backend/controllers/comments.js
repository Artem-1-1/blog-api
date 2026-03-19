import * as commentsQueries from "../db/comment.queries.js";

export const createComment = async(req, res) => {
  const { commentText, postId } = req.body;
  const userId = req.user.id; 

  try {
    const createComment = await commentsQueries.createComment(commentText, userId, postId)
    res.status(201).json(createComment);
  } catch (error) {
    res.status(500).json({ error: "Error with create comment" });
  }
};

export const editComment = async(req, res) => {
  const { commentText, userId } = req.body;
  const { id } = req.params;

  try {
    const editComment = await commentsQueries.updateComment(id, userId, commentText);
    res.status(201).json()
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: "Error with edit comment" });
  }
}

export const deleteComment = async( req, res ) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const deleteComment = await commentsQueries.deleteComment(id, userId)
    res.status(201).json(deleteComment)
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: "Error with delete comment"});
  }
}
