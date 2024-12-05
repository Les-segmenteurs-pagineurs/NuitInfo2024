import { Prisma } from "@prisma/client"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    

    const body = await readBody(event)

    const user = await prisma.user.findUnique(
      {
        where : {
          username : body.username,
          password : body.password,
        }
      }
    ) 

    const r = user ? true : false

    return r 
  })