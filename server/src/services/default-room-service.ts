import {Room} from "../classes/room";
import {RoomService} from "./interfaces/room-service";
import {RoomRepository} from "../repositories/interfaces/room-repository";
import {LazyPromise} from "../lazy";

export class DefaultRoomService implements RoomService
{
    constructor(private readonly roomRepository: RoomRepository)
    {
    }

    createItem(item: Room): Promise<LazyPromise<Room>>
    {
        return this.roomRepository.createItem(item);
    }

    getItems(search: string,page: number, limit: number): Promise<{ total: number, items: Room[] }>
    {
        return this.roomRepository.getItems(search,page, limit);
    }


    getItem(id: number): Promise<Room>
    {
        return this.roomRepository.getItem(id);
    }
}
