import prisma from "./pool.js"

//CREATE
export const createUser = async(username, password) => {
  return prisma.user.create({
    data: { username, password }
  })
}

//READ
export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  })
}