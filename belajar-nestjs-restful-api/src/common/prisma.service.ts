import { Inject, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      accelerateUrl: process.env.PRISMA_ACCELERATE_URL ?? '',
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
