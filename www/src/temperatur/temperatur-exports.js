import {SERVER_URL} from "../config.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "temperature/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  element.labels = items.map(item => new Date(item.measured).toLocaleTimeString());
  element.datasets = [{
    label: "Temperatur",
    data: items.map(item => item.valueCelsius),
    borderWidth: 1,
  }];
  element.scales.y = {
    max: 40,
    min: 0,
    border: {
      display: false,
    },
    ticks: {
      callback: (value) => value + "°C",
    },
  };

  element.loadChart();
}

export async function getTimespan(roomName, from, to)
{
  const url = "temperature/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}