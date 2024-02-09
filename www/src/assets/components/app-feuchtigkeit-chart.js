import {AppChart} from "./app-chart.js";
import {getTimespan} from "../../feuchtigkeit/feuchtigkeit-exports.js";
import {timeConfig} from "../scripts/common.js";

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
        tooltip: {
          callbacks: {
            label: (context) => context.parsed.y + "%",
          },
        },
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
        x: {
          min: from,
          max: to,
          type: "time",
          time: timeConfig,
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

    const datasets = [{
      label: "Feuchtigkeit",
      data: items.map(item =>
      {
        return {x: new Date(item.measured), y: item.valuePercentage.toFixed(2)};
      }),
      borderWidth: 1,
    }];

    const config = {
      type: "line",
      data: {datasets},
      options,
    };
    this.loadChart(config);
  }
}

customElements.define("app-feuchtigkeit-chart", AppFeuchtigkeitChart);