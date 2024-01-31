import {SERVER_URL} from "../config.js";
import {getCurrentRoom} from "../assets/components/app-header.js";

let chart;

async function createChartObject(element, chart, roomName)
{
  if (chart)
    chart.destroy();

  const tenMinutesAgo = new Date();
  tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

  const url = SERVER_URL + "light/" + roomName + "/" + tenMinutesAgo.getTime() + "-" + new Date().getTime();

  let result = await (await fetch(url)).json();

  const currentValueElement = document.querySelector("#currentValue");
  const currentValue = await (await fetch(SERVER_URL + "light/" + roomName + "?latest")).json();

  let items = result.items;
  while (result.links[0].next)
  {
    console.log("NEXT")
    const request = await fetch(result.links[0].next);
    result = await request.json();
    items.push(...result.items);
  }
  if (currentValueElement && currentValue.items[0])
  {
    currentValueElement.parentElement.hidden = false;
    currentValueElement.innerHTML = currentValue.items[0].value;
  }
  else
    currentValueElement.parentElement.hidden = true;

  const data = {
    labels: items.map(item => new Date(item.measured).toLocaleTimeString()),
    datasets: [{
      label: "Licht",
      data: items.map(item => (item.value / 10).toFixed(0)),
      borderWidth: 1,
    }],
  };
  return createChart(element, data);
}


const element = document.getElementById("myChart");
const header = document.querySelector("app-header");
const room = getCurrentRoom();

header.addEventListener("roomChanged", async (e) =>
{
  chart = await createChartObject(element,chart, e.detail);
});
if (room)
  createChartObject(element, chart, room).then(x =>
  {
     chart = x;
  });

const Chart = window.chartJs.Chart;

function createChart(element, data)
{
  return new Chart(element, {
    type: "line",
    data: data,
    options: {
      devicePixelRatio: 4,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },

      scales: {
        y: {
          min: 1000,
          max: 3000,
        }
      }
    },
  });
}