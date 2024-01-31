import {RoomService} from "../services/interfaces/room-service";
import {Room} from "../classes/room";

export class RoomController
{
    public constructor(private readonly roomService: RoomService)
    {
    }

    async getItems(search: string, page: number, limit: number): Promise<{ total: number, items: Room[] }>
    {
        return await this.roomService.getItems(search, page, limit);
    }

    async getItem(id: number): Promise<Room | null>
    {
        return this.roomService.getItem(id);
    }
}