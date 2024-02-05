export class AppCard extends HTMLElement
{
  get title()
  {
    return this.getAttribute("data-title");
  }

  set title(value)
  {
    this.setAttribute("data-title", value);
    this.shadowRoot.querySelector("#title").innerText = value;
  }

  get value()
  {
    return this.getAttribute("data-value");
  }

  set value(value)
  {
    this.setAttribute("data-value", value);
    this.shadowRoot.querySelector("#value").innerText = value;
  }

  constructor()
  {
    super();
    this.attach();
    this.render();
  }

  attach()
  {
    this.attachShadow({mode: "open"});
  }

  render()
  {
    const title = this.title ?? "";
    const value = this.value ?? "";
    //language=HTML
    this.shadowRoot.innerHTML = `
      <style>${this.styleCSS()}</style>
      <div class="container">
        <h2 class="center pad" id="title">${title}</h2>
        <div class="center pad" id="value">${value}</div>
      </div>
    `;
  }

  styleCSS()
  {
    //language=CSS
    return `
      .container {
        background-color: #f3faff;
        padding: 5px;
        border-radius: 5px;
      }

      h2 {
        margin: 0;
      }

      .center {
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: center;
      }

      .pad {
        padding: 5px;
      }
    `;
  }
}

customElements.define("app-card", AppCard);