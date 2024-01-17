import {Chart} from "chart.js/auto";

const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart2");


function createChart(elemnt,data){
    new Chart(elemnt, {
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
async function run(){
    try {
const response = await fetch("http://192.168.43.9:3000/Luft");
if (!response)
return;
    }
    catch(e){
        return;
    }

const result = await response.json();
console.log(result.items)
const data = {
    labels: result.items.map(item => item.measured.split("T")[1].split("Z")[0]),
    datasets:[ {
        label: "CO2 Gehalt",
       data: result.items.map(item => item.value),
       borderWidth: 1}],
}
console.log(data)
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
createChart(ctx,data)
}