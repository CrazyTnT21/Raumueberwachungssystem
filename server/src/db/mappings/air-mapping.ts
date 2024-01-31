import {KeyJoin, Mapping} from "../../mapping";
import {roomMapping} from "./room-mapping";
import {Air} from "../../classes/air";

export const airMapping: Mapping<Air> =
    {
        table: "Air",
        mapping: {
            id: "Id",
            value: "Value",
            measured: "Measured",
            room: new KeyJoin(roomMapping, "FKRoom", "Id")
        }
    }