import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaProvider implements OnModuleInit, OnModuleDestroy {
  protected readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  onModuleDestroy() {
    return this.prisma.$disconnect();
  }
  onModuleInit() {
    return this.prisma.$connect();
  }
}
