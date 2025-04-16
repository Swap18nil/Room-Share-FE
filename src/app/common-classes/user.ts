export class User{
    id: number;
    fullName: string;
    email: string;
    password: string;

    constructor(user?: User){
        this.id = user?.id || 0;
        this.fullName = user?.fullName || "";
        this.password = user?.password || "";
        this.email = user?.email || "";
    }
}