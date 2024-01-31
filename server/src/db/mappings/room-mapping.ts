import {KeyJoin, Mapping} from "../../mapping";
import {Room} from "../../classes/room";
import {lightMapping} from "./light-mapping";
import {airMapping} from "./air-mapping";

export const roomMapping: Mapping<Room> =
    {
        table: "Room",
        mapping: {
            id: "Id",
            name: "Name"
        }
    }