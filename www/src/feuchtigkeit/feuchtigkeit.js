import {getCurrentRoom} from "../assets/components/app-header.js";
import {dayTimespan, minutesAgo} from "../assets/scripts/helpers/dateHelper.js";
import {createChartObject, getLatest, getTimespan} from "./feuchtigkeit-exports.js";
import {updateGraphs} from "../assets/scripts/common.js";

const header = document.querySelector("app-header");
const room = getCurrentRoom();

header.addEventListener("roomChanged", async (e) =>
{
  document.querySelector("#currentRoom").innerText = e.detail;
  const items = await getTimespan(e.detail, minutesAgo(60 * 24), new Date());
  await updateGraphs(items, createChartObject);
});

if (room)
{
  document.querySelector("#currentRoom").innerText = room;
  const items = await getTimespan(room, minutesAgo(60 * 24), new Date());
  await updateGraphs(items, createChartObject);
}

const button = document.querySelector("#customTimespan");
button.addEventListener("click", async () =>
{
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");

  if (!from.value || !to.value)
    return;

  const fromValue = new Date(from.value);
  const toValue = new Date(to.value);

  if (!isNaN(fromValue.getTime()) && !isNaN(toValue.getTime()))
  {
    const items = await getTimespan(room, fromValue, toValue);
    createChartObject(document.querySelector("#customTimespanChart"), items);
  }
});
const customDay = document.querySelector("#customDay");

async function setCustomDay(day)
{
  const currentRoom = getCurrentRoom();
  if (!day || !currentRoom)
    return;

  const timespan = dayTimespan(day);
  const customDayChart = document.querySelector("#customDayChart");
  const items = await getTimespan(currentRoom, timespan.from, timespan.to);

  createChartObject(customDayChart, items);
}

customDay.addEventListener("change", async e => setCustomDay(e.target["value"]));
header.addEventListener("roomChanged", async () => setCustomDay(customDay.value));
if (room)
{
  const item = (await getLatest(room)).result;
  if (item)
    document.querySelector("#currentValue").value = item.valuePercentage.toFixed(2) + "% - " + new Date(item.measured).toLocaleTimeString();
}

setInterval(async () =>
{
  const room = getCurrentRoom();
  if (room)
  {
    const item = (await getLatest(room)).result;
    if (item)
      document.querySelector("#currentValue").value = item.valuePercentage.toFixed(2) + "% - " + new Date(item.measured).toLocaleTimeString();
  }
}, 5000);

