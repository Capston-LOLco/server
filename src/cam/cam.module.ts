import { Module } from '@nestjs/common';
import { CamService } from './cam.service';
import { CamController } from './cam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cam } from './entities/cam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cam])],
  controllers: [CamController],
  providers: [CamService],
  exports: [CamService],
})
export class CamModule {}
