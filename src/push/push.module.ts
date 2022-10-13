import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { CamModule } from 'src/cam/cam.module';
import { CamService } from 'src/cam/cam.service';

@Module({
  imports: [
    HttpModule,
    CamService,
  ],
  controllers: [PushController],
  providers: [PushService]
})
export class PushModule {}
