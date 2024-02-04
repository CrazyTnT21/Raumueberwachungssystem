import {getCurrentRoom} from "./assets/components/app-header.js";
import * as light from "./licht/licht-exports.js";
import * as temperature from "./temperatur/temperatur-exports.js";
import * as humidity from "./feuchtigkeit/feuchtigkeit-exports.js";
import {minutesAgo} from "./assets/scripts/helpers/dateHelper.js";

const header = document.querySelector("app-header");
header.addEventListener("roomChanged", async e =>
{
  const valuesPromise = updateValues(e.detail);
  const graphsPromise = updateGraphs(e.detail);
  await Promise.all([valuesPromise, graphsPromise]);
});
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
  const lightPromise = light.updateRecentValue(room, document.querySelector("#valueLight"), document.querySelector("#lastUpdateLight"));
  const temperaturePromise = temperature.updateRecentValue(room, document.querySelector("#valueTemperature"), document.querySelector("#lastUpdateTemperature"));
  const humidityPromise = humidity.updateRecentValue(room, document.querySelector("#valueHumidity"), document.querySelector("#lastUpdateHumidity"));

  return Promise.all([lightPromise, temperaturePromise, humidityPromise]);
}

async function updateGraphs(room)
{
  const temperatureItems = await temperature.getTimespan(room, minutesAgo(10), new Date());
  const lightItems = await light.getTimespan(room, minutesAgo(10), new Date());
  const humidityItems = await humidity.getTimespan(room, minutesAgo(10), new Date());
  temperature.createChartObject(document.querySelector("#temperatureChart"), temperatureItems);
  light.createChartObject(document.querySelector("#lightChart"), lightItems);
  humidity.createChartObject(document.querySelector("#humidityChart"), humidityItems);
}

void updateGraphs(room);