import prisma from "./pool.js"

//CREATE
export const createPost = async(title, postContent, isPublished, userId) => {
  return prisma.post.create({
    data: {title, postContent, isPublished, userId}
  })
}

//READ
export const getPostById = async(id) => {
  return prisma.post.findUnique({
    where: { id },
    include: { 
      comments: true, 
      user: true
    }
  })
}

export const getAllPublishedPosts = async() => {
  return prisma.post.findMany({
    where: { isPublished: true },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  })
}

export const getDraftPostsById = async(currentUserId) => {
  return prisma.post.findMany({
    where: { 
      userId: currentUserId, 
      isPublished: false     
    },
    include: {
      user: true
    },
    orderBy: { createdAt: "desc" }
  })
}

//UPDATE
export const updatePostById = async(postId, title, postContent, isPublished, currentUserId) => {
  return prisma.post.update({
    where: {
      id: postId,
      userId: currentUserId,
    },
    data : { title, postContent, isPublished }
  }) 
}

//DELETE
export const deletePostById = async(postId, userId) => {
  return prisma.post.delete({
    where: {
      id: postId,
      userId: userId
     }
  })
}

