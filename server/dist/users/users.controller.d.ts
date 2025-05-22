import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(userData: {
        email: string;
        password: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        password: string;
    }[]>;
}
