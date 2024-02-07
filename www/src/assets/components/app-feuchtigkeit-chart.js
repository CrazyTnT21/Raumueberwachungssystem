import {AppChart} from "./app-chart.js";
import {getTimespan} from "../../feuchtigkeit/feuchtigkeit-exports.js";

export class AppFeuchtigkeitChart extends AppChart
{
  get title()
  {
    return this.getAttribute("data-title") ?? "Feuchtigkeit";
  }

  constructor()
  {
    super();
  }

  async loadItems(room, from, to)
  {
    const options = {
      devicePixelRatio: 4,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: this.title,
          font: {
            size: 32,
          },
        },
      },
      scales: {
        y: {
          max: 80,
          min: 10,
          border: {
            display: false,
          },
          ticks: {
            callback: (value) => value + "%",
          },
        },
      },
    };

    const subtitle = this.subtitle;
    if (subtitle)
      options.plugins.subtitle = {
        display: true,
        text: subtitle,
        font: {
          size: 16,
        },
      };

    const items = await getTimespan(room, from, to);

    const labels = items.map(item => new Date(item.measured).toLocaleTimeString());

    const datasets = [{
      label: "Feuchtigkeit",
      data: items.map(item => item.valuePercentage.toFixed(2)),
      borderWidth: 1,
    }];

    const config = {
      type: "line",
      data: {labels, datasets},
      options,
    };
    this.loadChart(config);
  }
}

customElements.define("app-feuchtigkeit-chart", AppFeuchtigkeitChart);