import {KeyJoin, Mapping} from "../../mapping";
import {roomMapping} from "./room-mapping";
import {Light} from "../../classes/light";

export const lightMapping: Mapping<Light> =
    {
        table: "Light",
        mapping: {
            id: "Id",
            value: "Value",
            measured: "Measured",
            room: new KeyJoin(roomMapping,"FKRoom","Id")
        }
    }