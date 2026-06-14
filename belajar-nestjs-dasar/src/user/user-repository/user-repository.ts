import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('create user repository');
  }

  async save(firstName: string, lastName?: string) {
    this.logger.info(
      `create user with first_name ${firstName} & last_name ${lastName}`,
    );
    return await this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName ?? '',
      },
    });
  }
}

// export function createUserRepository(connection: Connection): UserRepository {
//   const repository = new UserRepository();
//   repository.connection = connection;
//   return repository;
// }
