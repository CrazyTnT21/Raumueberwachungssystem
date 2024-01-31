import {dhtPin} from "./pins";
import {Room} from "./classes/room";
import {sleep} from "./helper";
import {printRead, readDelay} from "./config";
import sensor from "node-dht-sensor";
import {HumidityService} from "./services/interfaces/humidity-service";
import {Humidity} from "./classes/humidity";
import {TemperatureService} from "./services/interfaces/temperature-service";
import {Temperature} from "./classes/temperature";
import {average} from "./light-sensor";

export async function readHumidityAndTemperature(room: Room, humidityService: () => HumidityService, temperatureService: () => TemperatureService)
{
    let delay = readDelay;
    while (true)
    {
        await sleep(delay);
        try
        {
            const startAfterFiveSeconds = new Date();
            const valuesHumidity: number[] = []
            const valuesTemperature: number[] = []
            startAfterFiveSeconds.setMilliseconds(startAfterFiveSeconds.getMilliseconds() + delay);

            while (new Date() < startAfterFiveSeconds)
            {
                const res = await sensor.read(11, dhtPin);

                valuesHumidity.push(res.humidity);
                valuesTemperature.push(res.temperature);
            }

            const averageTemperature = average(valuesTemperature);
            const averageHumidity = average(valuesHumidity);
            if (printRead)
            {
                console.log(
                    `(${new Date().toUTCString()}) ` +
                    `Temperatur: ${averageTemperature.toFixed(1)}°C, ` +
                    `Feuchtigkeit: ${averageHumidity.toFixed(1)}%`
                );
            }

            await humidityService().createItem(new Humidity(averageHumidity, new Date(), room))
            await temperatureService().createItem(new Temperature(averageTemperature, new Date(), room))

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