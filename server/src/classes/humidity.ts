import {Room} from "./room";

export class Humidity
{
    public id: number = 0;
    public valuePercentage: number;
    public measured: Date;
    public room: Room;

    constructor(valuePercentage: number, measured: Date, room: Room)
    {
        this.valuePercentage = valuePercentage;
        this.measured = measured;
        this.room = room;
    }
}