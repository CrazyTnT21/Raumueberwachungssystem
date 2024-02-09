import {AppChart} from "./app-chart.js";
import {getTimespan} from "../../licht/licht-exports.js";
import {timeConfig} from "../scripts/common.js";

export class AppLichtChart extends AppChart
{
  get title()
  {
    return this.getAttribute("data-title") ?? "Licht";
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
          max: 30000,
          min: 5000,
          border: {
            display: false,
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
      label: "Licht",
      data: items.map(item =>
      {
        return {x: new Date(item.measured), y: item.value.toFixed(2)};
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

customElements.define("app-licht-chart", AppLichtChart);