import { Inject, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST || '',
      user: process.env.DATABASE_USER || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || '',
      connectionLimit: 5,
    });

    super({
      adapter,
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  onModuleInit() {
    this.$on('info' as never, (e) => {
      this.logger.info(e);
    });
    this.$on('warn' as never, (e) => {
      this.logger.warn(e);
    });
    this.$on('error' as never, (e) => {
      this.logger.error(e);
    });
    this.$on('query' as never, (e) => {
      this.logger.info(e);
    });
  }
}
