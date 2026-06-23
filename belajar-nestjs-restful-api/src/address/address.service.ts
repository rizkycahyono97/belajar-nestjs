import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { Logger } from 'winston';
import { AddressValidation } from './address.validation';
import { ContactService } from 'src/contact/contact.service';
import { Address, User } from 'generated/prisma/client';
import { AddressReponse, CreateAddressRequest } from 'src/model/address.model';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressReponse> {
    this.logger.debug(
      `AddressService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const createRequest: CreateAddressRequest = this.validationService.validate(
      AddressValidation.CREATE,
      request,
    ) as CreateAddressRequest;

    await this.contactService.checkContactMustExists(
      user.username,
      createRequest.contact_id,
    );

    const address = await this.prismaService.address.create({
      data: createRequest,
    });

    return this.toAddressResponse(address);
  }

  toAddressResponse(address: Address): AddressReponse {
    return {
      id: address.id,
      street: address.street ?? undefined,
      city: address.city ?? undefined,
      province: address.province ?? undefined,
      country: address.country ?? '',
      postal_code: address.postal_code,
    };
  }
}
