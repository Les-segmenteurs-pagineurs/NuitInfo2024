import { HoneypotController } from "./honeypot/HoneypotController"

export default defineEventHandler(async (event) => {

    // Defining the HoneypotController
    const HoneypotControllerInstance: HoneypotController = new HoneypotController();

    const body = await readBody(event)

    // Fetching the IP address of the intruder from the request
    let ipAddress: string | string[] = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress || "Unknown";

    let intruderIpAddress: string = "Unknown";
    // If multiple IP addresses are present, use the first one
    if (ipAddress && typeof ipAddress === 'string') {
        intruderIpAddress = ipAddress.split(',')[0].trim();
    }

    // Verify is the intruder tried to login with the admin credentials
    if (body.username === "admin" && body.password === "admin") {
        HoneypotControllerInstance.createIntrusion(intruderIpAddress, event.node.req.url?.toString() || "Unknown");
        HoneypotControllerInstance.banAddress(intruderIpAddress);
        return true;
    }

    return false;
})