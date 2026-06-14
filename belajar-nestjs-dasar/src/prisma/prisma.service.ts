import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from 'src/generated/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    } as Prisma.PrismaClientOptions);
    console.info('Create prisma service');
  }
}
