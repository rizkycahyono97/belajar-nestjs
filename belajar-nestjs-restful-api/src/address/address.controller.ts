import {
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Auth } from 'src/common/auth.decorator';
import type { User } from 'generated/prisma/client';
import {
  AddressReponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  UpdateAddressRequest,
} from 'src/model/address.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/contacts/:contactId/addresses')
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

  @Get('/:addressId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<WebResponse<AddressReponse>> {
    const request = {
      contact_id: contactId,
      address_id: addressId,
    };

    const result = await this.addressService.get(user, request);

    return {
      data: result,
    };
  }

  @Put('/:addressId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() request: UpdateAddressRequest,
  ): Promise<WebResponse<AddressReponse>> {
    request.contact_id = contactId;
    request.id = addressId;

    const result = await this.addressService.update(user, request);

    return {
      data: result,
    };
  }

  @Delete('/:addressId')
  @HttpCode(200)
  async delete(
    @Auth() user: User,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebResponse<boolean>> {
    const request: DeleteAddressRequest = {
      address_id: addressId,
      contact_id: contactId,
    };

    await this.addressService.delete(user, request);

    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async list(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebResponse<AddressReponse[]>> {
    const result = await this.addressService.list(user, contactId);

    return {
      data: result,
    };
  }
}
