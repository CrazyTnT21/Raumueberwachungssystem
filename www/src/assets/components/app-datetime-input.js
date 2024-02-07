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

  get value()
  {
    const value = super.value;
    if (!value)
      return value;

    return new Date(value);
  }

  set value(value)
  {
    if (!value)
    {
      super.value = value;
      return;
    }

    const valueWithoutTimezone = new Date(value);
    valueWithoutTimezone.setMinutes(value.getMinutes() - value.getTimezoneOffset());
    super.value = valueWithoutTimezone.toISOString().slice(0, 16);
  }
}

customElements.define("app-datetime-input", AppDateTimeInput);
