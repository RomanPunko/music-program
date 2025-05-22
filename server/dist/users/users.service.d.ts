import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
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
