import { Global, Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { CamModule } from 'src/cam/cam.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Push } from './entities/push.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Push]), CamModule, UserModule],
  providers: [PushService],
  exports: [PushService],
  controllers: [PushController],
})
export class PushModule {}
