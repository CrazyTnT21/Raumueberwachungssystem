import {Chart} from "chart.js/auto";

export const SERVER_URL = "http://localhost:3000";

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

async function run()
{
  const response = await fetch(SERVER_URL + "/air").catch((e) => console.error(e));
  if (!response)
    return;

  const result = await response.json();
  const data = {
    labels: result.items.map(item => item.measured.substring(item.measured.indexOf("T") + 1, item.measured.length - 1)),
    datasets: [{
      label: "CO2 Gehalt",
      data: result.items.map(item => item.value),
      borderWidth: 1,
    }],
  };
  console.log(data);
  /*
  {
              labels: ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00"],
              datasets: [{
                  label: "CO2 Gehalt (%)",
                  data: [1, 14, 14, 3, 7, 3],
                  borderWidth: 1,
              }],
          }
  */
  createChart(ctx, data);
}
