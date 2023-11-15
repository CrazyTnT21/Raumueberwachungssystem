import {promise as GPIO} from "rpi-gpio";

export async function setupGPIO(): Promise<void>
{
    await GPIO.setup(7, GPIO.DIR_IN);
    await GPIO.read(7);
}