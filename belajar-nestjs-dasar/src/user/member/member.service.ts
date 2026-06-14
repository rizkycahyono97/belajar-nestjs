import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
  constructor(private moduleRef: ModuleRef) {}

  getConnectionName(): any {
    const connection = this.moduleRef.get(Connection);
    return connection.getName();
  }

  sendEmail(): void {
    const mailService = this.moduleRef.get(MailService);
    return mailService.send();
  }
}
