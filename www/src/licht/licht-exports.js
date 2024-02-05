import {SERVER_URL} from "../config.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function updateRecentValue(roomName, element, lastUpdatedElement)
{
  const value = await getLatest(roomName);
  if (element && value.result)
  {
    element.innerText = value.result.value.toFixed(0);
    lastUpdatedElement.innerText = new Date(value.result.measured).toLocaleTimeString();
  }
}

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "light/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  console.log(element);
  element.labels = items.map(item => new Date(item.measured).toLocaleTimeString());
  element.datasets = [{
    label: "Licht",
    data: items.map(item => item.value.toFixed(0)),
    borderWidth: 1,
  }];
  element.scales.y = {
    max: 40000,
    min: 15000,
    border: {
      display: false,
    },
  };
  element.loadChart();
}

export async function getTimespan(roomName, from, to)
{
  const url = "light/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}
