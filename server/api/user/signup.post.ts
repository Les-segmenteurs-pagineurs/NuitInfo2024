import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, email, password, confirmPassword } = body

  // Validation on the backend
  if (!username || !email || !password || !confirmPassword) {
    return { statusCode: 400, message: 'All fields are required' }
  }

  if (password !== confirmPassword) {
    return { statusCode: 400, message: 'Passwords do not match' }
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  })

  if (userExists) {
    return { statusCode: 400, message: 'Email is already registered' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const firstSkin = await prisma.skin.findFirst()
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      skins: {
        connect: [{ id: firstSkin?.id }],
      }
    },
  })

  const token = jwt.sign(
    { userId: newUser.id, username: newUser.username },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
  setCookie(event, 'authToken', token);

  return {
    statusCode: 200,
    message: 'User created successfully',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
    token,
  }
})