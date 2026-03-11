import prisma from "./pool.js"

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

//DELETE
export const deletePostById = async(id) => {
  return prisma.post.delete({
    where: { id }
  })
}

