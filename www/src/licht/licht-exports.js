import {SERVER_URL} from "../config.js";
import {createChart, defaultOptions} from "../assets/scripts/helpers/chartHelper.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function updateRecentValue(roomName, element, lastUpdatedElement)
{
  const value = await getLatest(roomName);
  if (element && value.result)
  {
    element.parentElement.hidden = false;
    element.innerHTML = value.result.value.toFixed(0);
    lastUpdatedElement.innerHTML = new Date(value.result.measured).toLocaleTimeString();
  }
  else
    element.parentElement.hidden = true;
}

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "light/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  const data = {
    labels: items.map(item => new Date(item.measured).toLocaleTimeString()),
    datasets: [{
      label: "Licht",
      data: items.map(item => item.value.toFixed(0)),
      borderWidth: 1,
    }],
  };
  const lightOptions = {
    ...defaultOptions,
    scales: {
      y: {
        max: 40000,
        min: 15000,
        border: {
          display: false,
        },
      },
    },
  };
  createChart(element, data, lightOptions);
}

export async function getTimespan(roomName, from, to)
{
  const url = "light/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}
