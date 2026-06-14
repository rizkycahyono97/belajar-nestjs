import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info('create user repository');
  }

  async save(firstName: string, lastName?: string) {
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
