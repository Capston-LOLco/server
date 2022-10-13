import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { send } from 'process';
import { User } from 'src/user/entities/user.entity';
import { CreatePushDto } from './dto/create-push.dto';
import { SendPushDto } from './dto/send-push.dto';
import { UpdatePushDto } from './dto/update-push.dto';

@Injectable()
export class PushService {
  // create(createPushDto: CreatePushDto) {
  //   return 'This action adds a new push';
  // }

  // findAll() {
  //   return `This action returns all push`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} push`;
  // }

  // update(id: number, updatePushDto: UpdatePushDto) {
  //   return `This action updates a #${id} push`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} push`;
  // }
  
  async sendPush(sendPushDto: SendPushDto) {
    const user = await this.getUserByCamId(sendPushDto.cam_id);
    return 'this action is sending push';
  }

  async getUserByCamId(cam_id: string): Promise<string> {
    
    // db에서 camid를 통해 user 조회하기
    // await
    const user = 'user';


    return user;
  }
}
