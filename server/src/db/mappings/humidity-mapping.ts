import {KeyJoin, Mapping} from "../../mapping";
import {roomMapping} from "./room-mapping";
import {Humidity} from "../../classes/humidity";

export const humidityMapping: Mapping<Humidity> =
    {
        table: "Humidity",
        mapping: {
            id: "Id",
            valuePercentage: "ValuePercentage",
            measured: "Measured",
            room: new KeyJoin(roomMapping,"FKRoom","Id")
        }
    }