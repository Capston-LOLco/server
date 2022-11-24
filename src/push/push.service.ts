import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CamService } from 'src/cam/cam.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Push } from './entities/push.entity';
import { FcmService } from 'nestjs-fcm';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly pushRepository: Repository<Push>,
    private readonly camService: CamService,
    private readonly userService: UserService,
    private readonly fcmService: FcmService,
  ) {
    this.pushRepository = pushRepository;
    this.camService = camService;
    this.userService = userService;
  }

  /* 
  create()
  cam 정보 생성
   */
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
    const payload = this.buildPayload(cam_name);
    const silent = true;
    await this.fcmService.sendNotification(deviceId, payload, silent);

    return savedPush;
  }

  /* createByUserId()
  user_id로 요청하여 푸시 알림 보내기 
  */
  async createByUserId(user_id: string): Promise<Push> {
    const created_at = new Date().toLocaleString();
    const cam_name = 'test';
    const push = this.pushRepository.create({
      created_at,
      user_id,
      cam_name,
    });

    const savedPush = await this.pushRepository.save(push);

    const token = await this.userService.getPushTokenByUserId(user_id);
    const deviceId = [token];
    const payload = this.buildPayload('test');
    const silent = true;
    await this.fcmService.sendNotification(deviceId, payload, silent);

    return savedPush;
  }

  /* 
  buildPayload()
  파이어베이스로 전송할 페이로드 생성 
  */
  buildPayload(cam_name: string) {
    return {
      notification: {
        title: '이탈 위험 감지',
        body: cam_name + ' 캠에서 이탈 위험이 감지되었습니다.',
      },
    };
  }

  /* 
  findAllByUserId()
  유저의 모든 푸시 알림 조회
   */
  async findAllByUserId(user_id: string): Promise<Push[]> {
    const found = await this.pushRepository.find({
      where: {
        user_id,
      },
    });
    return found;
  }

  async findAll(): Promise<Push[]> {
    return this.pushRepository.find();
  }
}
