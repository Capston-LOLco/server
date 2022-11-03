import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { send } from 'process';
import { CamService } from 'src/cam/cam.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePushDto } from './dto/create-push.dto';
import { UpdatePushDto } from './dto/update-push.dto';
import { Push } from './entities/push.entity';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly pushRepository: Repository<Push>,
    private readonly camService: CamService,
  ) {
    this.pushRepository = pushRepository;
    this.camService = camService;
  }

  async create(cam_id: string): Promise<Push> {
    const created_at = new Date().toLocaleString();
    const user_id: string = await this.camService.getUserIdByCamId(cam_id);
    const push = this.pushRepository.create({
      created_at,
      cam_id,
      user_id,
    });

    const savedPush = await this.pushRepository.save(push);

    this.sendPush(cam_id);

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

  async sendPush(cam_id: string) {
    const savedPush = this.create(cam_id);

    const user_id = await this.camService.getUserIdByCamId(cam_id);

    return 'this action is sending push';
  }
}
