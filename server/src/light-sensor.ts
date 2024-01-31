import i2c from "i2c-bus"
import {lightPin} from "./pins";
import {LightService} from "./services/interfaces/light-service";
import {Light} from "./classes/light";
import {Room} from "./classes/room";
import {ads1115} from "./ads1115";
import {sleep} from "./helper";
import {printRead, readDelay} from "./config";

export async function readLightData(room: Room, lightService: () => LightService)
{
    let delay = readDelay;
    const bus = await i2c.openPromisified(1);

    const ads = new ads1115(bus);
    await ads.open(1);
    ads.gain = 1;
    while (true)
    {
        try
        {
            await sleep(delay);
            const value = await ads.measure(lightPin + "+GND");

            if (printRead)
                console.log(`Light sensor: ${value}`)

            await lightService().createItem(new Light(value, new Date(), room))

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