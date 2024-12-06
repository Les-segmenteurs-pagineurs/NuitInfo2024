import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  
  const { userId, username, email, password } = await readBody(event);

  try {
    const dataToUpdate: any = {};

    if (username) {
      dataToUpdate.username = username;
    }

    if (email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        return { status: 400, message: 'Email is already taken' };
      }
      dataToUpdate.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    return { status: 200, message: 'User updated successfully', user: updatedUser };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Server error' };
  }
});