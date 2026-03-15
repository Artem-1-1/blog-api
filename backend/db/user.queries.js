import prisma from "./pool.js"

//CREATE
export const createUser = async(username, password, role) => {
  return prisma.user.create({
    data: { username, password, role: role || undefined  }
  })
}

//READ
export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  })
}

export const getUserByUsername = async(username) => {
  return prisma.user.findUnique({
    where: { username }
  })
}