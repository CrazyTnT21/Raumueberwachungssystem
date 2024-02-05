import {minutesAgo} from "./helpers/dateHelper.js";

export async function updateGraphs(items,chartFunction)
{
  const sixHours = items.filter(x => new Date(x.measured) >= minutesAgo(60 * 6));
  const hour = sixHours.filter(x => new Date(x.measured) >= minutesAgo(60));
  const tenMinutes = hour.filter(x => new Date(x.measured) >= minutesAgo(10));
  chartFunction(document.querySelector("#dayChart"), items);
  chartFunction(document.querySelector("#halfDayChart"), sixHours);
  chartFunction(document.querySelector("#hourChart"), hour);
  chartFunction(document.querySelector("#tenMinutesChart"), tenMinutes);
}