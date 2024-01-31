import {dhtPin} from "./pins";
import {Room} from "./classes/room";
import {sleep} from "./helper";
import {printRead, readDelay} from "./config";
import sensor from "node-dht-sensor";
import {HumidityService} from "./services/interfaces/humidity-service";
import {Humidity} from "./classes/humidity";
import {TemperatureService} from "./services/interfaces/temperature-service";
import {Temperature} from "./classes/temperature";

export async function readHumidityAndTemperature(room: Room, humidityService: () => HumidityService, temperatureService: () => TemperatureService)
{
    let delay = readDelay;
    while (true)
    {
        await sleep(delay);
        try
        {
            const res = await sensor.read(11, dhtPin);
            if (printRead)
            {
                console.log(
                    `Temperatur: ${res.temperature.toFixed(1)}°C, ` +
                    `Feuchtigkeit: ${res.humidity.toFixed(1)}%`
                );
            }

            await humidityService().createItem(new Humidity(res.humidity, new Date(), room))
            await temperatureService().createItem(new Temperature(res.temperature, new Date(), room))

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