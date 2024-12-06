import { defineEventHandler, sendError } from 'h3';
import { HoneypotController } from '../api/honeypot/HoneypotController';

export default defineEventHandler(async (event) => {
    const HoneypotControllerInstance: HoneypotController = new HoneypotController();

    // Get User IP Address
    const ipAddress = event.node.req.headers['x-forwarded-for'] ||
                      event.node.req.socket.remoteAddress ||
                      "Unknown";

    let intruderIpAddress = "Unknown";

    if (typeof ipAddress === 'string') {
        intruderIpAddress = ipAddress.split(',')[0].trim(); // Use the first if multiple IP addresses are present
    }

    try {
        // Check if the incoming IP address is blocked
        const blockedAddresses = await HoneypotControllerInstance.getBlockedAddresses();
        const blockedSet = new Set(blockedAddresses.map((addr: { ipAddress: string }) => addr.ipAddress.trim()));

        if (blockedSet.has(intruderIpAddress)) {
            // Blocked IP address : return 403 Forbidden
            return sendError(event, createError({
                statusCode: 403,
                statusMessage: 'Forbidden: Your IP address is blocked.',
                data: { success: false, reason: 'Blocked IP' }
            }));
        }

        return; // Else, continue
    } catch (error) {
        console.error('Erreur lors de la récupération des adresses bloquées:', error);

        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, reason: 'Server error' }
        }));
    }
});
