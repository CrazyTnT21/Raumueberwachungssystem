import {getCurrentRoom} from "./assets/components/app-header.js";
import * as light from "./licht/licht-exports.js";
import * as temperature from "./temperatur/temperatur-exports.js";
import * as humidity from "./feuchtigkeit/feuchtigkeit-exports.js";
import * as air from "./luft/luft-exports.js";
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
    await updateValues(room);

}, 5000);

async function updateValues(room)
{
  const lightItem = (await light.getLatest(room)).result;
  const humidityItem = (await humidity.getLatest(room)).result;
  const temperatureItem = (await temperature.getLatest(room)).result;
  const airItem = (await air.getLatest(room)).result;

  if (lightItem)
    document.querySelector("#valueLight").value = lightItem.value.toFixed(2) + " - " + new Date(lightItem.measured).toLocaleTimeString();
  if (humidityItem)
    document.querySelector("#valueHumidity").value = humidityItem.valuePercentage.toFixed(2) + "% - " + new Date(humidityItem.measured).toLocaleTimeString();
  if (temperatureItem)
    document.querySelector("#valueTemperature").value = temperatureItem.valueCelsius.toFixed(2) + "°C - " + new Date(temperatureItem.measured).toLocaleTimeString();
  if (airItem)
    document.querySelector("#valueAir").value = airItem.value.toFixed(2) + " - " + new Date(airItem.measured).toLocaleTimeString();
}

async function updateGraphs(room)
{
  const temperatureItems = await temperature.getTimespan(room, minutesAgo(10), new Date());
  const lightItems = await light.getTimespan(room, minutesAgo(10), new Date());
  const humidityItems = await humidity.getTimespan(room, minutesAgo(10), new Date());
  const airItems = await air.getTimespan(room, minutesAgo(10), new Date());

  air.createChartObject(document.querySelector("#airChart"), airItems);
  temperature.createChartObject(document.querySelector("#temperatureChart"), temperatureItems);
  light.createChartObject(document.querySelector("#lightChart"), lightItems);
  humidity.createChartObject(document.querySelector("#humidityChart"), humidityItems);
}

void updateGraphs(room);