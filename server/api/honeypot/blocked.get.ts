import { Prisma } from "@prisma/client"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {

    const blocked = await prisma.honeyPot_BlockedAddress.findMany({
        select:{
            ipAddress : true,
            blocked : true,
            createdAt : true
        }
    })

    return blocked
});