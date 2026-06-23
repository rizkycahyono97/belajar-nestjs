import {
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Auth } from 'src/common/auth.decorator';
import type { User } from 'generated/prisma/client';
import { AddressReponse, CreateAddressRequest } from 'src/model/address.model';
import { WebResponse } from 'src/model/web.model';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param('contactid', ParseIntPipe) contactId: number,
    @Body() request: CreateAddressRequest,
  ): Promise<WebResponse<AddressReponse>> {
    const result = await this.addressService.create(user, request);

    return {
      data: result,
    };
  }
}
