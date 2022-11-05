import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { CamService } from 'src/cam/cam.service';
import { PushService } from './push.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [CamService, UserService],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
