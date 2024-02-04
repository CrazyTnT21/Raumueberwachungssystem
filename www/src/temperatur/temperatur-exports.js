import {SERVER_URL} from "../config.js";
import {createChart, defaultOptions} from "../assets/scripts/helpers/chartHelper.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function updateRecentValue(roomName, element, lastUpdatedElement)
{
  const value = await getLatest(roomName);
  if (element && value.result)
  {
    element.parentElement.hidden = false;
    element.innerHTML = value.result.valueCelsius.toFixed(2) + "°C";
    lastUpdatedElement.innerHTML = new Date(value.result.measured).toLocaleTimeString();
  }
  else
    element.parentElement.hidden = true;

}

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "temperature/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  const data = {
    labels: items.map(item => new Date(item.measured).toLocaleTimeString()),
    datasets: [{
      label: "Temperatur",
      data: items.map(item => item.valueCelsius.toFixed(2)),
      borderWidth: 1,
    }],
  };
  const temperatureOptions = {
    ...defaultOptions,
    scales: {
      y: {
        max: 40,
        min: 0,
        border: {
          display: false,
        },
        ticks: {
          callback: (value) =>
          {
            return value + "°C";
          },
        },
      },
    },
  };
  createChart(element, data, temperatureOptions);
}

export async function getTimespan(roomName, from, to)
{
  const url = "temperature/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}