import {AppInput} from "./app-input.js";

export class AppDateTimeInput extends AppInput
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

customElements.define("app-datetime-input", AppDateTimeInput);
