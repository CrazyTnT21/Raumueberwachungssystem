import {Chart} from "chart.js/auto";

const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart2");


createChart(ctx)
createChart(ctx2)
function createChart(elemnt){
    new Chart(elemnt, {
        type: "line",
        data: {
            labels: ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00"],
            datasets: [{
                label: "CO2 Gehalt (%)",
                data: [1, 14, 14, 3, 7, 3],
                borderWidth: 1,
            },{
                label: "Temperatur (Celsius)",
                data: [4, 3, 3, 3, 2,1],
                borderWidth: 1,
            }],
        },
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