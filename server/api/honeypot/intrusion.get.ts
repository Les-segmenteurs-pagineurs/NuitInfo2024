import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {

    const intrusions = await prisma.honeyPot_Intrusion.findMany({
        select:{
            ipAddress : true,
            route : true, 
            createdAt : true
        }
    })

    return intrusions
});