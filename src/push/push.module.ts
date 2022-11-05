import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { CamModule } from 'src/cam/cam.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cam } from 'src/cam/entities/cam.entity';
import { Push } from './entities/push.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Push]), CamModule, UserModule],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
