import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        let skins
        skins = await prisma.skin.findMany()

        if (!skins) {
            return { message: "Skins not found" }
        }
        return { statusCode: 200, skins };
    } 
    catch (error) {
        console.error(error)
        return { message: "An error occurred while fetching skins" }
    }
})