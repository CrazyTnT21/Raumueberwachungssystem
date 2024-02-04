import {SERVER_URL} from "../config.js";
import {createChart, defaultOptions} from "../assets/scripts/helpers/chartHelper.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function updateRecentValue(roomName, element, lastUpdatedElement)
{
  const value = await getLatest(roomName);
  if (element && value.result)
  {
    element.parentElement.hidden = false;
    element.innerHTML = value.result.valuePercentage.toFixed(2) + "%";
    lastUpdatedElement.innerHTML = new Date(value.result.measured).toLocaleTimeString();
  }
  else
    element.parentElement.hidden = true;
}

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "humidity/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  const data = {
    labels: items.map(item => new Date(item.measured).toLocaleTimeString()),
    datasets: [{
      label: "Feuchtigkeit",
      data: items.map(item => item.valuePercentage.toFixed(2)),
      borderWidth: 1,
    }],
  };
  const humidityOptions = {
    ...defaultOptions,
    scales: {
      y: {
        max: 80,
        min: 10,
        border: {
          display: false,
        },
        ticks: {
          callback: (value) =>
          {
            return value + "%";
          },
        },
      },
    },
  };
  createChart(element, data, humidityOptions);
}

export async function getTimespan(roomName, from, to)
{
  const url = "humidity/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}
