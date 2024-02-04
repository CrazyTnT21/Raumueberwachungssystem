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
            <li><a href="/feuchtigkeit">Feuchtigkeit</a></li>
            <li><a href="/team">Team</a></li>
          </ul>
        </nav>
        <ul style="width: 100%" id="rooms"></ul>
      </header>
    `;
  }

  styleCSS()
  {
    //language=CSS
    return `
      header {
        display: flex;
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
        flex-wrap: wrap;
      }

      h1 {
        margin: 0;
      }

      @media screen and (min-width: 700px) {
        h1 {
          font-size: 36px;
        }

        h1 > a:hover {
          font-size: 38px;
        }

        li > a:hover {
          font-size: 22px;
        }
      }

      @media screen and (max-width: 700px) {
        h1 {
          font-size: 26px;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        margin-bottom: 0;
      }

      li {
        display: inline;
      }

      a {
        padding: 5px;
        color: #fff;
        text-decoration: none;
      }

      li a {
        font-size: 18px;
      }

      li a:hover {
        color: #ccc;
      }

      nav,
      ul,
      li,
      a {
        display: flex;
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
      this.rooms = result.result;
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