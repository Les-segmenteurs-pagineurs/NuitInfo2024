import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "~/lib/prisma";

interface DecodedToken extends JwtPayload {
  id: string;
}

export default defineEventHandler(async (event) => {
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

  try {
    // Vérifier et décoder le token
    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    return { statusCode: 403, message: "Token invalide" };
  }

  const body = await readBody(event);

  const skinId = body.skinId;
  console.log(skinId, skinId)

  try {
    // Trouver le skin avec l'ID
    const skin = await prisma.skin.findUnique({
      where: { id: skinId },
    });

    if (!skin) {
      return { status: 404, message: 'Skin non trouvé' };
    }

    // Trouver l'utilisateur avec l'ID décodé
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return { status: 404, message: 'Utilisateur non trouvé' };
    }

    // Vérifier si l'utilisateur a suffisamment de fonds
    if (user.money < skin.price) {
      return { status: 400, message: 'Fonds insuffisants' };
    }

    // Mettre à jour l'utilisateur avec l'achat du skin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        money: user.money - skin.price, // Déduire le prix du skin
        skins: {
          connect: { id: skin.id }, // Ajouter le skin à l'utilisateur
        },
      },
    });

    return { status: 200, message: 'Achat de skin effectué avec succès', user: updatedUser };
  } catch (error) {
    console.error("Erreur durant l'achat:", error);
    return { status: 500, message: 'Erreur serveur' };
  }
});