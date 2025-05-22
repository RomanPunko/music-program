import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: { email: string; password: string }) {
    return this.prisma.user.create({ data: userData });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}