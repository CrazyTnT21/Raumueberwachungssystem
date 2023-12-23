import {Room} from "./room";

export class Humidity
{
    public id: number = 0;
    public value: number;
    public measured: Date;
    public room: Room;

    constructor(value: number, measured: Date, room: Room)
    {
        this.value = value;
        this.measured = measured;
        this.room = room;
    }
}