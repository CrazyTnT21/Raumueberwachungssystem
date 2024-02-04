import {SERVER_URL} from "../../../config.js";

export async function getUntilItemCount(relativeUrl, itemCount = 100000)
{
  const url = SERVER_URL + relativeUrl;

  let result = await (await fetch(url)).json();

  const items = result.result;
  while (result.links[0].next && items.length <= itemCount)
  {
    const request = await fetch(result.links[0].next);
    result = await request.json();
    items.push(...result.result);
  }
  return items;
}
