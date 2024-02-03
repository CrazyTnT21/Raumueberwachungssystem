export function endOfDay(day)
{
  const result = new Date(day);
  if (isNaN(result.getTime()))
    throw new Error("Invalid Date");

  result.setHours(23, 59, 59, 999);
  return result;
}

export function dayTimespan(day)
{
  const from = new Date(day);

  if (isNaN(from.getTime()))
    throw new Error("Invalid Date");

  from.setHours(0, 0, 0, 0);
  const to = endOfDay(day);
  return {from, to};
}

export function minutesAgo(minutes, date = new Date())
{
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - minutes);
  return result;
}
