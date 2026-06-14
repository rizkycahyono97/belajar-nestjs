import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  send() {
    console.info('Send Mail');
  }
}

export const mailService = new MailService();
