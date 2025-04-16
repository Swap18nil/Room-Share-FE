import { Ber, Preference, RoomType } from "./enums/room-type";

export class Room{
    id: number;
    title: string;
    description: string;
    address: string;
    city: string;
    type: RoomType;
    price: number;
    preference: Preference;
    ber: Ber;
    images: Array<string>;
    userId: number

    constructor(post? : Room){
        this.id     = post?.id || 0;
        this.title  = post?.title || "";
        this.description = post?.description || ""
        this.city  = post?.city || ""
        this.address  = post?.address || ""
        this.type  = post?.type || RoomType.Double
        this.price  = post?.price || 0
        this.preference  = post?.preference || Preference.Any
        this.ber  = post?.ber || Ber.B2
        this.images  = post?.images || [];
        this.userId  = post?.userId || 0
    }

}
