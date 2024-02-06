import i2c from "i2c-bus"
import {AirPin, lightPin} from "./pins";
import {LightService} from "./services/interfaces/light-service";
import {Light} from "./classes/light";
import {Room} from "./classes/room";
import {ads1115} from "./ads1115";
import {printRead, readDelay} from "./config";
import {sleep} from "./helper";
import {AirService} from "./services/interfaces/air-service";

export async function readLightData(room: Room, lightService: () => LightService, airService: () => AirService)
{
    let delay = readDelay;
    const bus = await i2c.openPromisified(1);

    const ads = new ads1115(bus);
    await ads.open(1);
    ads.gain = 2 / 3;
    while (true)
    {
        try
        {
            const startAfterFiveSeconds = new Date();
            const lightValues: number[] = []
            const airValues: number[] = []
            startAfterFiveSeconds.setMilliseconds(startAfterFiveSeconds.getMilliseconds() + delay);

            while (new Date() < startAfterFiveSeconds)
            {
                const lightValue = await ads.measure(lightPin + "+GND");
                const airValue = await ads.measure(AirPin + "+GND");

                lightValues.push(lightValue);
                airValues.push(airValue);
                await sleep(100);
            }

            const averageLightValue = average(lightValues);
            const averageAirValue = average(airValues);
            if (printRead)
            {
                console.log(`(${new Date().toUTCString()}) ` + `Light sensor: ${averageLightValue.toFixed(1)}`)
                console.log(`(${new Date().toUTCString()}) ` + `Air sensor: ${averageAirValue.toFixed(1)}`)
            }
            await lightService().createItem(new Light(averageLightValue, new Date(), room))
            await airService().createItem(new Light(averageAirValue, new Date(), room))

            if (delay > readDelay)
                delay -= 1000;
        }
        catch (e)
        {
            console.error(e);
            delay += 1000;
        }
    }
}

export function average(values: number[])
{
    if (values.length == 0)
        throw new Error("Missing values");

    let intermediateValue = values[0];

    for (let i = 1; i < values.length; i++)
    {
        intermediateValue += values[i];
    }
    return intermediateValue / values.length;
}