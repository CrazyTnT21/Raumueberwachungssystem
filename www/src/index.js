import {Chart} from "chart.js/auto";

export const SERVER_URL = "http://192.168.43.99:3000";

const ctx = document.getElementById("myChart");

function createChart(element, data)
{
  new Chart(element, {
    type: "line",
    data: data,
    options: {
      devicePixelRatio: 4,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "CO2 Gehalt & Temperatur",
        },
      },
    },
  });
}

run();

async function getData(page){
  const response = await fetch(SERVER_URL + `/light?room=a&page=${page}`).catch((e) => console.error(e));

  if (!response)
    return [];

  return (await response.json()).items;
}
async function run()
{
const result = [...await getData(0),...await getData(1), ...await getData(2),...await getData(3),...await getData(4),...await getData(5)]
  console.log(result)
  const data = {
    labels: result.map(item => item.measured.substring(item.measured.indexOf("T") + 1, item.measured.length - 1)),
    datasets: [{
      label: "Licht",
      data: result.map(item => item.value),
      borderWidth: 1,
    }],
  };
  console.log(data);

  createChart(ctx, data);
}
