import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { getCookie } from "h3";

const prisma = new PrismaClient();

interface DecodedToken extends JwtPayload {
  id: string;
}

export default defineEventHandler(async (event) => {
  try {

    const token = getCookie(event, "authToken");
    if (!token) {
      return { statusCode: 403, message: "Token manquant" };
    }

    // Vérifier que la clé secrète JWT est définie
    if (!process.env.JWT_SECRET) {
      console.error("La variable JWT_SECRET n'est pas définie.");
      return { statusCode: 500, message: "Erreur de configuration du serveur" };
    }

    let decoded: DecodedToken;

    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        skins: true,
      },
    });

    return { statusCode: 200, user };
  } catch (error) {
    console.error("Erreur serveur :", error);
    return { statusCode: 500, message: "Erreur interne du serveur" };
  }
});