import {SERVER_URL} from "../config.js";

export async function updateRecentValue(roomName,element)
{
  const value = await getLatest(roomName);
  if (element && value.items[0])
  {
    element.parentElement.hidden = false;
    element.innerHTML = value.items[0].value.toFixed(0) + " (Lichtwiederstand) <br>Zuletzt aktualisiert: " + new Date(value.items[0].measured).toLocaleTimeString();
  }
  else
    element.parentElement.hidden = true;
}
export async function getLatest(roomName)
{
  return (await fetch(SERVER_URL + "light/" + roomName + "?latest")).json();
}