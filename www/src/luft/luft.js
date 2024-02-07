import {getCurrentRoom} from "../assets/components/app-header.js";
import {dayTimespan, minutesAgo} from "../assets/scripts/helpers/dateHelper.js";
import {getLatest} from "./luft-exports.js";

const header = document.querySelector("app-header");
header.addEventListener("roomChanged", async (e) =>
{
  document.querySelector("#currentRoom").innerText = e.detail;
  await updateGraphs(e.detail);
});

const button = document.querySelector("#customTimespan");
button.addEventListener("click", async () =>
{
  const fromElement = document.querySelector("#from");
  const toElement = document.querySelector("#to");

  if (!fromElement.value || !toElement.value)
    return;

  const from = fromElement.value;
  const to = toElement.value;
  const room = getCurrentRoom();
  return document.querySelector("#customTimespanChart").loadItems(room, from, to);
});

const customDay = document.querySelector("#customDay");

customDay.addEventListener("change", async e => setCustomDay(e.target["value"]));
header.addEventListener("roomChanged", async () => setCustomDay(customDay.value));

const loadedRoom = getCurrentRoom();
if (loadedRoom)
{
  getLatest(loadedRoom).then(item =>
  {
    if (item)
      setCurrentValue(item);
  });
  document.querySelector("#currentRoom").innerText = loadedRoom;
  void updateGraphs(loadedRoom);
}

setInterval(async () =>
{
  const room = getCurrentRoom();
  if (room)
  {
    const item = await getLatest(room);
    if (item)
      setCurrentValue(item);
  }
}, 5000);


async function updateGraphs(room)
{
  const now = new Date();
  const promises = [
    document.querySelector("#tenMinutesChart").loadItems(room, minutesAgo(10), now),
    document.querySelector("#hourChart").loadItems(room, minutesAgo(60), now),
    document.querySelector("#halfDayChart").loadItems(room, minutesAgo(60 * 6), now),
    document.querySelector("#dayChart").loadItems(room, minutesAgo(60 * 24), now),
  ];
  const customDay = document.querySelector("#customDay");
  if (customDay.value)
  {
    const {from, to} = dayTimespan(customDay.value);
    promises.push(document.querySelector("#customDayChart").loadItems(room, from, to));
  }
  const customTimespanFrom = document.querySelector("#from");
  if (customTimespanFrom.value)
  {
    const customTimespanTo = document.querySelector("#to");
    if (customTimespanTo.value)
    {
      promises.push(document.querySelector("#customTimespanChart").loadItems(room, customTimespanFrom.value, customTimespanTo.value));
    }
  }
  return Promise.all(promises);
}

async function setCustomDay(day)
{
  const currentRoom = getCurrentRoom();
  if (!day || !currentRoom)
    return;

  const timespan = dayTimespan(day);

  return document.querySelector("#customDayChart").loadItems(currentRoom, timespan.from, timespan.to);
}

function setCurrentValue(item)
{
  const value = item.value.toFixed(2);
  const time = new Date(item.measured).toLocaleTimeString();
  document.querySelector("#currentValue").value = `${value} - ${time}`;
}