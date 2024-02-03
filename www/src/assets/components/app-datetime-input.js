import {Input} from "./app-input.js";

export class DateTimeInput extends Input
{
  constructor()
  {
    super();
    this.setType();
  }

  setType()
  {
    this.shadowRoot.querySelector("input").type = "datetime-local";
  }
}

customElements.define("app-datetime-input", DateTimeInput);
