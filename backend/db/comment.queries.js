import prisma from "./pool.js"

export const createComment = async(commentText, userId, postId) => {
  return prisma.comment.create({
    data: {commentText, userId, postId}
  })
}

export const updateComment = async(id, userId, commentText,) => {
  return prisma.comment.updateMany({
    where:
     { id: id,
       userId: userId
    },
    data: { commentText }
  })
}

export const deleteComment = async(id, userId) => {
  return prisma.comment.deleteMany({
    where: {
      id: id,
      userId: userId
     }
  })
}
