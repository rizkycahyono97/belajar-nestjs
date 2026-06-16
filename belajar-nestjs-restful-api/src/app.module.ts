import { Global, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';

@Global()
@Module({
  imports: [CommonModule, UserModule, ContactModule],
  controllers: [ContactController],
  providers: [],
})
export class AppModule {}
