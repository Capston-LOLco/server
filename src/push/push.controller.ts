import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePushDto } from './dto/create-push.dto';
import { UpdatePushDto } from './dto/update-push.dto';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  /* 
  create()
  푸시 알림 데이터 생성
  Post 요청 -> 필요 데이터 -> json type => { 'user_id": 'data'}
  */
  @Post()
  // create(@Body() createPushDto: CreatePushDto) {
  async create(@Body() user_info: JSON) {
    // return this.pushService.create(createPushDto.cam_id);
    console.log('PushController.create');
    return this.pushService.createByUserId(user_info['user_id']);
  }

  @Get()
  findAll() {
    return this.pushService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pushService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePushDto: UpdatePushDto) {
  //   return this.pushService.update(+id, updatePushDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pushService.remove(+id);
  // }

  /* 
  findAllByUserId()
  user_id로 생성된 푸시 알림 목록 조회하기
  Get 요청 -> /push/user_id */
  @Get(':user_id')
  async findAllByUserId(@Param('user_id') user_id: string) {
    return await this.pushService.findAllByUserId(user_id);
  }
}
