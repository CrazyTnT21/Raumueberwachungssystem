import {AppInput} from "./app-input.js";

export class AppDateInput extends AppInput
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

customElements.define("app-date-input", AppDateInput);