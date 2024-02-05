export class AppButton extends HTMLElement
{
  get value()
  {
    return this.getAttribute("data-value");
  }

  set value(value)
  {
    this.setAttribute("data-value", value);
    this.shadowRoot.querySelector("button").innerText = this.value;
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
    const content = this.innerHTML;
    const value = this.value || content;

    this.innerHTML = "";
    //language=HTML
    this.shadowRoot.innerHTML = `
      <style>${this.styleCSS()}</style>
      <button>${value}</button>
    `;
    this.value = value;
  }

  styleCSS()
  {
    //language=CSS
    return `
      button {
        min-width: 4rem;
        min-height: 2rem;
        width: 100%;
        height: 100%;
        border: 0;
      }

      button:hover {
        background-color: #d2d2d2;
      }

      button:active {
        background-color: #c5c5c5;
      }
    `;
  }
}

customElements.define("app-button", AppButton);