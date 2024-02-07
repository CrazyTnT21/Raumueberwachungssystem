import {SERVER_URL} from "../config.js";
import {getUntilItemCount} from "../assets/scripts/helpers/endpointHelper.js";

export async function getLatest(roomName)
{
  const response = await fetch(`${SERVER_URL}light/${roomName}?latest`);
  const jsonResponse = await response.json();
  return jsonResponse.result;
}

export async function getTimespan(roomName, from, to)
{
  const url = `light/${roomName}/${from.getTime()}-${to.getTime()}`;
  return await getUntilItemCount(url);
}
