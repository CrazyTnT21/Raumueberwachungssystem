import {SERVER_URL} from "../config.js";

export async function updateRecentValue(roomName, element, lastUpdatedElement)
{
  const value = await getLatest(roomName);
  if (element && value.result)
  {
    element.parentElement.hidden = false;
    element.innerHTML = value.result.value.toFixed(0);
    lastUpdatedElement.innerHTML = new Date(value.result.measured).toLocaleTimeString();
  }
  else
    element.parentElement.hidden = true;
}

export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "light/" + roomName + "?latest")).json();
}