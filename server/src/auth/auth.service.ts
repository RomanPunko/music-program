import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';



@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.id);
    
    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }


  getNewTokens = async (refreshToken: string) => {
    const result = await this.jwt.verifyAsync(refreshToken)

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({ where:{
      id: result.id,
    }})

    if (!user) {
      throw new UnauthorizedException('User not found');
    }


    const tokens = await this.issueTokens(user.id);
    
    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (oldUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  private async issueTokens(userId: string) {
    const data = {
      id: userId,
    }

    const accessToken = await this.jwt.signAsync(data, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwt.signAsync(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
