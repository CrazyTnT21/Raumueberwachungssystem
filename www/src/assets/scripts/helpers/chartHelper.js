const Chart = window.chartJs.Chart;


export const defaultOptions = {
  devicePixelRatio: 4,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  maxRotation: 0
};

export function createChart(element, data, options = defaultOptions)
{
  const chart = Chart.getChart(element.id);
  if (chart)
    chart.destroy();

  return new Chart(element, {
    type: "line",
    data: data,
    options: options,
  });
}