import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { PushModule } from './push/push.module';
import { CamModule } from './cam/cam.module';
import { FcmModule } from 'nestjs-fcm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PushModule,
    CamModule,
    FcmModule.forRoot({
      firebaseSpecsPath: __dirname + '/configs/serviceAccountKey.json',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
