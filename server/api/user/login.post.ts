import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { useRouter } from "nuxt/app";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Rechercher l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // Vérification des informations d'identification
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return { success: false, message: "Invalid username or password" };
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Définir un cookie pour le token
    setCookie(event, "authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseInt(process.env.JWT_EXPIRES_IN || "3600"), // Par défaut 1 heure
    });
    const router = useRouter();
    router.push({ name: '/account' })
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, message: "An error occurred during authentication" };
  }
});