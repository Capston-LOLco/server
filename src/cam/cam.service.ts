import { Injectable } from '@nestjs/common';
import { CreateCamDto } from './dto/create-cam.dto';
import { UpdateCamDto } from './dto/update-cam.dto';

@Injectable()
export class CamService {
  create(createCamDto: CreateCamDto) {
    return 'This action adds a new cam';
  }

  findAll() {
    return `This action returns all cam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cam`;
  }

  update(id: number, updateCamDto: UpdateCamDto) {
    return `This action updates a #${id} cam`;
  }

  remove(id: number) {
    return `This action removes a #${id} cam`;
  }
}
