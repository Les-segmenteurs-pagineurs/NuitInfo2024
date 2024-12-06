import { Prisma } from "@prisma/client"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {

    const data = await prisma.seaOrgan.findMany() 

    return data
  })