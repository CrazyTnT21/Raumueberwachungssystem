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
const loadedRoom = getCurrentRoom();
if (loadedRoom)
{
  await updateValues(loadedRoom);
}
setInterval(async () =>
{
  const room = getCurrentRoom();
  if (room)
    await updateValues(room);

}, 5000);

void updateGraphs(loadedRoom);

async function updateValues(room)
{
  const lightItem = await light.getLatest(room);
  const humidityItem = await humidity.getLatest(room);
  const temperatureItem = await temperature.getLatest(room);
  const airItem = await air.getLatest(room);

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
  document.querySelector("#airChart").loadItems(room, minutesAgo(10), new Date());
  document.querySelector("#temperatureChart").loadItems(room, minutesAgo(10), new Date());
  document.querySelector("#lightChart").loadItems(room, minutesAgo(10), new Date());
  document.querySelector("#humidityChart").loadItems(room, minutesAgo(10), new Date());
}