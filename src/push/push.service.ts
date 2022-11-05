import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CamService } from 'src/cam/cam.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Push } from './entities/push.entity';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly pushRepository: Repository<Push>,
    private readonly camService: CamService,
    private readonly userService: UserService,
  ) {
    this.pushRepository = pushRepository;
    this.camService = camService;
    // this.userService = userService;
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

    this.sendPush(user_id, cam_name);

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

  async sendPush(user_id: string, cam_name: string) {
    // firebase info
    // const api_key = firebase api_key
    const push_token = await this.userService.getPushTokenByUserId(user_id);
    // const message = "{cam_name}에서 이탈 감지가 인식되었습니다."

    //
    // 파이어베이스 푸시 요청
    //
    return 'this action is sending push';
  }
}
