import {
  Controller,
  Post,
  Get,
  Res,
  Param,
  Query,
  Header,
  HttpCode,
  Redirect,
  Req,
  Inject,
  Body,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from './connection/connection';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { User } from '../../generated/prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
    @Inject('EmailService') private emailService: MailService,
  ) {}
  // @Inject()
  // private userService: UserService;

  @Get('/connection')
  sayConnection(): any {
    this.mailService.send();
    this.emailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }

  @Post('/create')
  createUserPrisma(
    @Body('first_name') firstName: string,
    @Body('last_name') lastName: string,
  ): Promise<User> {
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          errors: 'first_name is required',
        },
        400,
      );
    }

    return this.userRepository.save(firstName, lastName);
  }

  @Get('/hello')
  // @UseFilters(ValidationFilter)
  sayHello(@Query('name') name: string): string {
    return this.service.sayHello(name);
  }

  // view
  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }

  //cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('success set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): any {
    return request.cookies['name'];
  }

  @Post()
  createUser(): string {
    return 'Create User';
  }

  @Get('/sample') // /api/user/sample
  getUser(): string {
    return 'Get User';
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): string {
    return `HAI REQ PARAMS ${id}`;
  }
}
