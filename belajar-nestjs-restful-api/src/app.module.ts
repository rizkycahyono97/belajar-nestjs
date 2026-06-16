import { Global, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [CommonModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
