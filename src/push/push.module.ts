import {
  DynamicModule,
  Global,
  Logger,
  Module,
  ValueProvider,
} from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { CamModule } from 'src/cam/cam.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Push } from './entities/push.entity';
import { FcmOptions } from './interfaces/fcm-options.interface';
import { FCM_OPTIONS } from './push.constants';

@Global()
@Module({})
export class PushModule {
  static forRoot(options: FcmOptions): DynamicModule {
    const optionsProvider: ValueProvider = {
      provide: FCM_OPTIONS,
      useValue: options,
    };
    const logger = options.logger ? options.logger : new Logger('PushModule');
    return {
      module: PushModule,
      providers: [
        { provide: Logger, useValue: logger },
        PushService,
        optionsProvider,
      ],
      exports: [PushService],
      imports: [TypeOrmModule.forFeature([Push]), CamModule, UserModule],
      controllers: [PushController],
    };
  }
}
