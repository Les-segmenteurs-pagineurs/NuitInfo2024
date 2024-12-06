import prisma from "~/lib/prisma";

// This controller handle creating honeypot intrusion 
// Made as a standalone controller in order to be used in multiple routes
export class HoneypotController {
    constructor() { }

    // Create Intrusion
    public async createIntrusion(ipAddress: string, route: string): Promise<void> {
        await prisma.honeyPot_Intrusion.create({
            data: {
                ipAddress: ipAddress,
                route: route,
            }
        })
    }

    // Get all Intrusions
    public async getIntrusions(): Promise<any> {
        return await prisma.honeyPot_Intrusion.findMany();
    }

    public async getBlockedAddresses(): Promise<any> {
        return await prisma.honeyPot_BlockedAddress.findMany({
            where: {
                blocked: true,
            }
        })
    }

    // Ban Address 
    public async banAddress(ipAddress: string): Promise<void> {
        await prisma.honeyPot_BlockedAddress.create({
            data: {
                ipAddress: ipAddress,
            }
        })
    }

    // unban Address from the blocked list
    public async unbanAddress(_ipAddress: string): Promise<void> {
        await prisma.honeyPot_BlockedAddress.update({
            where: {
                ipAddress: _ipAddress,
            },
            data: {
                blocked: false,
            }
        })
    }
}