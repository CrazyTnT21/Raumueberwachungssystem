import {SERVER_URL} from "../config.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "humidity/" + roomName + "?latest")).json();
}

export function createChartObject(element, items)
{
  element.labels = items.map(item => new Date(item.measured).toLocaleTimeString());
  element.datasets = [{
    label: "Feuchtigkeit",
    data: items.map(item => item.valuePercentage.toFixed(2)),
    borderWidth: 1,
  }];
  element.scales.y = {
    max: 80,
    min: 10,
    border: {
      display: false,
    },
    ticks: {
      callback: (value) => value + "%",
    },
  };
  element.loadChart();
}

export async function getTimespan(roomName, from, to)
{
  const url = "humidity/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}
