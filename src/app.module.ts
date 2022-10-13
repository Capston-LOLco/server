import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PushModule } from './push/push.module';
import { CamModule } from './cam/cam.module';

@Module({
  imports: [
    UserModule, 
    TypeOrmModule.forRoot(typeOrmConfig), 
    PushModule, CamModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
}
