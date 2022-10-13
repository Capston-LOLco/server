import { Module } from '@nestjs/common';
import { CamService } from './cam.service';
import { CamController } from './cam.controller';

@Module({
  controllers: [CamController],
  providers: [CamService]
})
export class CamModule {}
