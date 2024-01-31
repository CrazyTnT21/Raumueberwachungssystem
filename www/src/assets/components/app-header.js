import {SERVER_URL} from "../../config.js";


class AppHeader extends HTMLElement
{
  set rooms(rooms)
  {
    const roomsUl = this.shadowRoot.querySelector("#rooms");
    roomsUl.innerHTML = "";
    for (const room of rooms)
    {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.append(a);
      a.addEventListener("click", () =>
      {
        setCurrentRoom(room.name);
        li.dispatchEvent(new CustomEvent("roomChanged", {detail: room.name, composed: true}));
      });
      a.innerHTML = room.name;
      roomsUl.append(li);
    }
  }

  constructor()
  {
    super();
    this.attachShadow({mode: "open"});

    //language=HTML
    this.shadowRoot.innerHTML = `
      <style>
        ${this.styleCSS()}
      </style>
      <header>
        <h1><a href="/">Raumüberwachungssystem</a></h1>
        <nav>
          <ul>
            <li><a href="/licht">Licht</a></li>
            <li><a href="/temperatur">Temperatur</a></li>
            <li><a href="/Feuchtigkeit">Feuchtigkeit</a></li>
            <li><a href="/Team">Team</a></li>
          </ul>
        </nav>
        <ul id="rooms">

        </ul>
      </header>
    `;
  }

  styleCSS()
  {
    //language=CSS
    return `
      header {
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
      }

      h1 {
        margin: 0;
        font-size: 36px;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        display: inline;
        margin: 5px;
      }

      a {
        color: #fff;
        text-decoration: none;
      }

      li a {
        font-size: 18px;
      }

      li a:hover {
        color: #ccc;
      }
    `;
  }

  async connectedCallback()
  {
    if (this.getAttribute("data-choose") !== "")
      return;
    const roomsElement = this.shadowRoot.querySelector("#rooms");
    if (roomsElement.childElementCount === 0)
    {
      const request = await fetch(SERVER_URL + "room");
      const result = await request.json();
      this.rooms = result.items;
    }
  }

  async disconnectedCallback()
  {

  }
}

customElements.define("app-header", AppHeader);

export function getCurrentRoom()
{
  return localStorage.getItem("last-room");
}

export function setCurrentRoom(room)
{
  return localStorage.setItem("last-room", room);
}