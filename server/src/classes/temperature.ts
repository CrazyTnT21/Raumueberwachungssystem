import {Room} from "./room";

export class Temperature
{
    public id: number = 0;
    public valueCelsius: number;
    public measured: Date;
    public room: Room;

    constructor(valueCelsius: number, measured: Date, room: Room)
    {
        this.valueCelsius = valueCelsius;
        this.measured = measured;
        this.room = room;
    }
}