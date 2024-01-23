import i2c from "i2c-bus"
import ads1015 from "ads1015"
import {lightPin} from "./pins";
import {LightService} from "./services/interfaces/light-service";
import {Light} from "./classes/light";
import {Room} from "./classes/room";

export async function readLightData(room: Room, lightService: () => LightService)
{
    let delay = 10000; //10 Sekunden
    await i2c.openPromisified(1).then(async bus =>
    {
        const ads = await ads1015(bus);
        ads.gain = 1;
        while (true)
        {
            try
            {
                const value = await ads.measure(lightPin + "+GND");
                await lightService().createItem(new Light(value, new Date(), room))

                await sleep(delay);
                if (delay > 10000)
                    delay -= 1000;
            }
            catch (e)
            {
                console.error(e);
                delay += 1000;
            }
        }
    });
}


function sleep(amount: number): Promise<void>
{
    return new Promise(resolve => setTimeout(() => resolve(), amount))
}