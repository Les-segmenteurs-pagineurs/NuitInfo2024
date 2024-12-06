import { HoneypotController } from "./HoneypotController"
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const honeypotController: HoneypotController = new(HoneypotController);

  const body = await readBody(event);
  
  const ipAddress = await prisma.honeyPot_BlockedAddress.update({
    where : {
      ipAddress : body.ipAddress,
    },
    data : {
      blocked : false,
    }
  })

  return ipAddress
})
