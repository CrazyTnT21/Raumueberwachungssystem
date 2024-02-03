import {getCurrentRoom} from "./assets/components/app-header.js";
import * as light from "./licht/licht-exports.js";
import * as temperature from "./temperatur/temperatur-exports.js";
import * as humidity from "./feuchtigkeit/feuchtigkeit-exports.js";

const header =document.querySelector("app-header")
header.addEventListener("roomChanged", e => updateValues(e.detail))
const room = getCurrentRoom();
if (room)
{
  await updateValues(room);
}
setInterval(async () =>
{
  const room = getCurrentRoom();
  if (room)
  {
    await updateValues(room);
  }
}, 5000);

async function updateValues(room)
{
  const lightPromise = light.updateRecentValue(room, document.querySelector("#valueLight"));
  const temperaturePromise = temperature.updateRecentValue(room, document.querySelector("#valueTemperature"));
  const humidityPromise = humidity.updateRecentValue(room, document.querySelector("#valueHumidity"));

  return Promise.all([lightPromise, temperaturePromise, humidityPromise]);
}
//TODO: Graphen