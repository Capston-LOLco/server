import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCamDto } from './dto/create-cam.dto';
import { UpdateCamDto } from './dto/update-cam.dto';
import { Cam } from './entities/cam.entity';

@Injectable()
export class CamService {

  constructor(
    @InjectRepository(Cam)
    private readonly camRespository: Repository<Cam>
  ) {
    this.camRespository = camRespository;
  }

  async create(createCamDto: CreateCamDto) {

    const { cam_id, cam_name, user_id } = createCamDto;

    const cam = this.camRespository.create({
      cam_id,
      cam_name,
      user_id,
    });

    const savedCam = await this.camRespository.save(cam);

    return savedCam;
  }

  async getUserIdByCamId(cam_id: string): Promise<String>{
    const user = await this.camRespository.findOne({
      where: {
        cam_id,
      },
    });

    return user.user_id;
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
