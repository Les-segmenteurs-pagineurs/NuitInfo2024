import jwt from "jsonwebtoken";
import { sendRedirect } from 'h3'; // Si vous utilisez H3 (Nuxt 3 ou un framework similaire)

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export default defineEventHandler(async (event) => {
    const token = getCookie(event, "authToken");

    if (!token) {
        return {
            success: false,
            message: "No active session found.",
        };
    }

    if (!SECRET_KEY) {
        console.error("JWT_SECRET_KEY is not defined.");
        return {
            success: false,
            message: "Server configuration error.",
        };
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        setCookie(event, "authToken", "", { maxAge: -1 });

        // Redirection après déconnexion pour recharger la page (par exemple, vers la page d'accueil)
        sendRedirect(event, '/login');  // Redirige l'utilisateur vers la page de login ou d'accueil
        return {
            success: true,
            message: "Successfully logged out.",
        };
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return {
                success: false,
                message: "Invalid token.",
            };
        } else if (error instanceof jwt.TokenExpiredError) {
            return {
                success: false,
                message: "Token has expired.",
            };
        } else {
            console.error("Error during token verification:", error);
            return {
                success: false,
                message: "An error occurred during logout.",
            };
        }
    }
});