export class Input extends HTMLElement
{
  get label()
  {
    return this.getAttribute("data-label");
  }

  set label(value)
  {
    if (!value)
    {
      logNoValueError("data-label", this.outerHTML,this.parentElement.outerHTML);
      value = "";
    }
    this.setAttribute("data-label", value);
    this.shadowRoot.querySelector("label").innerHTML = value;
  }

  get value()
  {
    return this.shadowRoot.querySelector("input").value;
  }

  set value(value)
  {
    this.shadowRoot.querySelector("input").value = value;
  }

  get placeholder()
  {
    return this.getAttribute("data-placeholder");
  }

  set placeholder(value)
  {
    this.setAttribute("data-placeholder", value);
    this.shadowRoot.querySelector("input").placeholder = value;
  }

  connectedCallback()
  {
    this.shadowRoot
      .querySelector("input")
      .addEventListener("change", () => this.dispatchEvent(new Event("change")));
  }

  disconnectedCallback()
  {
    this.shadowRoot
      .querySelector("input")
      .removeEventListener("change", () => this.dispatchEvent(new Event("change")));
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
    const label = this.label ?? "";
    if (!label) logNoValueError("label", this.outerHTML,this.parentElement.outerHTML);

    const placeholder = this.placeholder;

    //language=HTML
    this.shadowRoot.innerHTML = `
      <style>
        ${this.styleCSS()}
      </style>
      <div>
        <label for="input">${label}</label>
      </div>
      <input id="input" ${placeholder ? `placeholder="${placeholder}"` : ""}/>
    `;
  }

  styleCSS()
  {
    //language=CSS
    return `
      input {
        border-width: 1px;
        border-style: solid;
        border-color: #b6b6b6;
        padding: 5px;
        font-family: "Fira Sans", sans-serif;
        margin: 2px;
      }

      input:hover {
        border-color: #d2d2d2;
        transition: border-color ease 50ms;
      }
    `;
  }
}

export function logNoValueError(property, outerHtml,parentHTML)
{
  console.error(`No value was given for '${property}' in '${outerHtml}' inside parent '${parentHTML}'`);
}

customElements.define("app-input", Input);