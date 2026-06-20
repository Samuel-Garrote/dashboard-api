import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(search?: string) {
    return this.prisma.user.findMany({
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      omit: { password: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: {
    name: string;
    email: string;
    role: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
      omit: { password: true },
    });
  }
  update(id: number, data: { name?: string; email?: string; role?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
