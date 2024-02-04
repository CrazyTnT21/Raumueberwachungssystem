import {getCurrentRoom} from "../assets/components/app-header.js";
import {createChart, defaultOptions} from "../assets/scripts/helpers/chartHelper.js";
import {dayTimespan, minutesAgo} from "../assets/scripts/helpers/dateHelper.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";
import {updateRecentValue} from "./temperatur-exports.js";


async function getTimeSpan(roomName, from, to)
{
  const url = "temperature/" + roomName + "/" + from.getTime() + "-" + to.getTime();
  return await getUntilItemCount(url);
}

function createChartObject(element, items)
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

const header = document.querySelector("app-header");
const room = getCurrentRoom();

async function updateGraphs(room)
{
  const items = await getTimeSpan(room, minutesAgo(60 * 24), new Date());
  const sixHours = items.filter(x => new Date(x.measured) >= minutesAgo(60 * 6));
  const hour = sixHours.filter(x => new Date(x.measured) >= minutesAgo(60));
  const tenMinutes = hour.filter(x => new Date(x.measured) >= minutesAgo(10));
  createChartObject(document.querySelector("#dayChart"), items);
  createChartObject(document.querySelector("#halfDayChart"), sixHours);
  createChartObject(document.querySelector("#hourChart"), hour);
  createChartObject(document.querySelector("#tenMinutesChart"), tenMinutes);
}


header.addEventListener("roomChanged", async (e) =>
{
  setRoomText(e.detail);
  await updateGraphs(e.detail);
});

if (room)
{
  setRoomText(room);
  void updateGraphs(room);
}

const button = document.querySelector("#customTimespan");
button.addEventListener("click", async () =>
{
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");
  console.log(from, to);
  if (!from.value || !to.value)
    return;

  const fromValue = new Date(from.value);
  const toValue = new Date(to.value);

  if (!isNaN(fromValue.getTime()) && !isNaN(toValue.getTime()))
  {
    const items = await getTimeSpan(room, fromValue, toValue);
    const data = {
      labels: items.map(item => new Date(item.measured).toLocaleTimeString()),
      datasets: [{
        label: "Temperatur",
        data: items.map(item => item.valueCelsius.toFixed(2)),
        borderWidth: 1,
      }],
    };
    createChart(document.querySelector("#customTimespanChart"), data);
  }
});

const customDay = document.querySelector("#customDay");

customDay.addEventListener("change", async e =>
{
  if (!e.target["value"])
    return;

  const timespan = dayTimespan(e.target["value"]);
  const customDayChart = document.querySelector("#customDayChart");
  const items = await getTimeSpan(room, timespan.from, timespan.to);

  createChartObject(customDayChart, items);
});
if (room)
  void updateRecentValue(room, document.querySelector("#currentValue"), document.querySelector("#lastUpdate"));

setInterval(async () =>
{
  const room = getCurrentRoom();
  if (room)
    await updateRecentValue(room, document.querySelector("#currentValue"), document.querySelector("#lastUpdate"));
}, 5000);


function setRoomText(room)
{
  document.querySelector("#currentRoom").innerText = room;
}