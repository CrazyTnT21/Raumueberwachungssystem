import { Gpio } from "onoff";

export async function setupGPIO(): Promise<void> {
    const test = new Gpio(12, "in");
    await test.read();
}