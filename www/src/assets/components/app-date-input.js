import {Input} from "./app-input.js";

export class DateInput extends Input
{
  constructor()
  {
    super();
    this.setType();
  }

  setType()
  {
    this.shadowRoot.querySelector("input").type = "date";
  }
}

customElements.define("app-date-input", DateInput);