import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService, // standard provider
    {
      provide: Connection, // class provider
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService, // value provider
      useValue: mailService,
    },
    {
      provide: 'EmailService', //alias provider
      useExisting: MailService,
    },
    UserRepository,
    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
