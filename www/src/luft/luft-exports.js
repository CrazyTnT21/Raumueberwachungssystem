import {SERVER_URL} from "../config.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";



export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "air/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  element.labels = items.map(item => new Date(item.measured).toLocaleTimeString());
  element.datasets = [{
    label: "Luft",
    data: items.map(item => (item.value / 100).toFixed(0)),
    borderWidth: 1,
  }];
  element.scales.y = {
    max: 100,
    min: 0,
    border: {
      display: false,
    },
    ticks: {
      callback: (value) => value + " ppm",
    },
  };
  element.loadChart();
}

export async function getTimespan(roomName, from, to)
{
  const url = "air/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}
