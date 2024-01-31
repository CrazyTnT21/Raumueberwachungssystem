import {KeyJoin, Mapping} from "../../mapping";
import {roomMapping} from "./room-mapping";
import {Temperature} from "../../classes/temperature";

export const temperatureMapping: Mapping<Temperature> =
    {
        table: "Temperature",
        mapping: {
            id: "Id",
            valueCelsius: "ValueCelsius",
            measured: "Measured",
            room: new KeyJoin(roomMapping,"FKRoom","Id")
        }
    }