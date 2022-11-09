import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CamService } from 'src/cam/cam.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Push } from './entities/push.entity';
import { FcmOptions } from './interfaces/fcm-options.interface';
import { FCM_OPTIONS } from './push.constants';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly pushRepository: Repository<Push>,
    private readonly camService: CamService,
    private readonly userService: UserService,
    @Inject(FCM_OPTIONS) private fcmOptionsProvider: FcmOptions,
    private readonly logger: Logger,
  ) {
    this.pushRepository = pushRepository;
    this.camService = camService;
    this.userService = userService;
    this.fcmOptionsProvider = fcmOptionsProvider;
  }

  async create(cam_id: string): Promise<Push> {
    const created_at = new Date().toLocaleString();
    // const user_id: string = await this.camService.getUserIdByCamId(cam_id);
    // const cam_name: string = await this.camService.get
    const cam = await this.camService.findOne(cam_id);
    const cam_name = await cam.cam_id;
    const user_id = await cam.user_id;
    const push = this.pushRepository.create({
      created_at,
      cam_name,
      user_id,
    });

    const savedPush = await this.pushRepository.save(push);

    const deviceId = [await this.userService.getPushTokenByUserId(user_id)];
    const payload = {};
    const silent = true;
    this.sendNotification(deviceId, payload, silent);

    return savedPush;
  }

  async findAllByUserId(user_id: string): Promise<Push[]> {
    const found = await this.pushRepository.find({
      where: {
        user_id,
      },
    });

    return found;
  }
  // deviceIds: 유저토큰배열
  // payload: fcm 요청 데이터
  // silent:
  async sendNotification(
    deviceIds: Array<string>,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (deviceIds.length == 0) {
      throw new Error('You provide an empty device ids list!');
    }

    if (firebaseAdmin.apps.length === 0) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          this.fcmOptionsProvider.firebasePath,
        ),
      });
    }

    const body: firebaseAdmin.messaging.MulticastMessage = {
      tokens: deviceIds,
      data: payload?.data,
      notification: {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      },
      apns: {
        payload: {
          aps: {
            sound: payload?.notification?.sound,
            contentAvailable: silent ? true : false,
            mutableContent: true,
          },
        },
        fcmOptions: {},
      },
      android: {
        priority: 'high',
        ttl: 60 * 60 * 24,
        notification: {
          sound: payload?.notification?.sound,
        },
      },
    };

    let result = null;
    let failureCount = 0;
    let successCount = 0;
    const failedDeviceIds = [];

    while (deviceIds.length) {
      try {
        result = await firebaseAdmin
          .messaging()
          .sendMulticast({ ...body, tokens: deviceIds.splice(0, 500) }, false);
        if (result.failureCount > 0) {
          const failedTokens = [];
          result.responses.forEach((resp, id) => {
            if (!resp.success) {
              failedTokens.push(deviceIds[id]);
            }
          });
          failedDeviceIds.push(...failedTokens);
        }
        failureCount += result.failureCount;
        successCount += result.successCount;
      } catch (error) {
        this.logger.error(error.message, error.stackTrace, 'nestjs-fcm');
        throw error;
      }
    }
    return { failureCount, successCount, failedDeviceIds };
  }
}
