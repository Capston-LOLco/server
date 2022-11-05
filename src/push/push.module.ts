import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { HttpModule } from '@nestjs/axios';
import { CamService } from 'src/cam/cam.service';
import { PushService } from './push.service';

@Module({
  imports: [HttpModule, CamService],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
